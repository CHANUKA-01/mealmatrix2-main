// route/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

/* ==================== constants ==================== */
const SELF_SIGNUP_ROLES = ['CUSTOMER', 'DELIVERY']; // only these can register themselves
const STAFF_ROLES = ['MANAGER', 'INVENTORY_CLERK', 'PROMO_OFFICER']; // created by admin only

/* ==================== helpers ==================== */
function signToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role || 'CUSTOMER',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Auth reads cookie OR bearer header and sets req.userId / req.userRole
function auth(req, res, next) {
  let token = req.cookies?.token;
  const authz = req.headers.authorization;
  if (!token && authz?.startsWith('Bearer ')) token = authz.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function requireRole(...allowed) {
  return (req, res, next) => {
    if (!req.userRole || !allowed.includes(req.userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

/* ==================== validation ==================== */
function validateSelfSignup(body) {
  const {
    firstName, lastName, universityId, phone, email, password, confirmPassword, role,
  } = body;

  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    return 'All fields are required';
  }
  if (password !== confirmPassword) return 'Passwords do not match';

  const roleUpper = (role || '').toUpperCase();
  if (!SELF_SIGNUP_ROLES.includes(roleUpper)) {
    return 'Selected role is not allowed for self-registration';
  }

  if (!universityId) return 'universityId is required';
  if (!/^[0-9]{10}$/.test(phone)) return 'Phone number must be 10 digits';

  return null;
}

function validateAdminCreateUser(body) {
  const { firstName, lastName, email, role, password } = body;
  if (!firstName || !lastName || !email || !role || !password) {
    return 'Missing required fields';
  }
  const roleUpper = role.toUpperCase();
  if (![...STAFF_ROLES, 'DELIVERY', 'CUSTOMER'].includes(roleUpper)) {
    return 'Invalid role';
  }
  return null;
}

/* ==================== SELF SIGNUP (customer, delivery) ==================== */
// POST /api/auth/user/signup
router.post('/user/signup', async (req, res) => {
  try {
    const error = validateSelfSignup(req.body);
    if (error) return res.status(400).json({ message: error });

    const {
      firstName, lastName, universityId, phone, email, password, role,
    } = req.body;

    const roleUpper = role.toUpperCase(); // CUSTOMER or DELIVERY
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      universityId,
      phone,
      email: email.toLowerCase(),
      password: hashed,
      role: roleUpper,
      status: 'ACTIVE',
    });

    return res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
      role: user.role,
    });
  } catch (err) {
    console.error('signup error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/* ==================== LOGIN (all actors) ==================== */
// POST /api/auth/user/login
router.post('/user/login', async (req, res) => {
  const { email, password } = req.body || {};
  try {
    if (!email || !password) {
      console.error('Login error: missing email or password');
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.error(`Login error: user not found for email ${email}`);
      return res.status(404).json({ message: 'User not found' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      console.error(`Login error: invalid password for email ${email}`);
      return res.status(401).json({ message: 'Invalid password or Email' });
    }

    if (user.status === 'DISABLED') {
      console.error(`Login error: account disabled for email ${email}`);
      return res.status(403).json({ message: 'Account disabled. Contact support.' });
    }

    const token = signToken(user);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax', // capital L is fine; node parses case-insensitive
        path: '/',       // set at root so all routes can see it
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: 'Login successful',
        userId: user._id,
        email: user.email,
        role: user.role,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
      });

    // NOTE: Do NOT redirect here. Let the FRONTEND decide based on { role }.
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/* ==================== LOGOUT ==================== */
// POST /api/auth/user/logout
router.post('/user/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/', // MUST match the set path to actually clear it
  });
  return res.status(200).json({ message: 'Logged out successfully' });
});

/* ==================== PROFILE (self) ==================== */
// GET /api/auth/user/profile
router.get('/user/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error('profile error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/auth/user/updateUser
router.put('/user/updateUser', auth, async (req, res) => {
  try {
    const allowed = [
      'firstName', 'lastName', 'phone', 'country', 'language', 'timezone', 'nickName', 'universityId',
    ];
    const updates = {};
    for (const k of allowed) if (k in req.body) updates[k] = req.body[k];
    if ('universityId' in updates && !updates.universityId) updates.universityId = undefined;

    const updated = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
    return res.json(updated);
  } catch (err) {
    console.error('updateUser error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/* ==================== ADMIN: create staff/others ==================== */
// POST /api/auth/admin/create-user
router.post('/admin/create-user', auth, requireRole('ADMIN'), async (req, res) => {
  try {
    const errMsg = validateAdminCreateUser(req.body);
    if (errMsg) return res.status(400).json({ message: errMsg });

    const { firstName, lastName, email, phone, universityId, role, password } = req.body;
    const roleUpper = role.toUpperCase();

    // Optional: prevent creating another ADMIN from API
    if (roleUpper === 'ADMIN') {
      return res.status(403).json({ message: 'Creating ADMIN via API is disabled' });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      universityId: universityId || undefined,
      password: hash,
      role: roleUpper,
      status: 'ACTIVE',
    });

    return res.status(201).json({
      message: 'User created',
      userId: user._id,
      role: user.role,
    });
  } catch (err) {
    console.error('admin create-user error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/whoami  -> returns the user identity from the JWT
router.get('/whoami', authMiddleware, (req, res) => {
  // req.user was set by authMiddleware
  const { userId, email, role, managerId } = req.user || {};
  res.json({ userId, email, role, managerId: managerId || null });
});

module.exports = router;
