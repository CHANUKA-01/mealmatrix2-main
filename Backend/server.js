const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ROUTES
const authRoutes = require('./route/auth');
const uploadRoutes = require('./route/userProfileImg');
const updateprfileRoutes = require('./route/updateUser');
const reviewRoutes = require('./route/reviews');
const productsRoutes = require('./route/getProductDetails');
const distance = require('./route/calculate_distance');
const cartRoutes = require('./route/cart');
const orderplacement = require('./route/orderPlacement');
const profileRoutes = require('./route/getUserDetailsRoute');
const canteenRoutes = require('./route/canteen');
const inventoryRoutes = require('./route/inventory');
const analyticsRoutes = require('./route/analytics');

// MODELS (register with Mongoose; do NOT app.use models)
require('./models/User');
require('./models/Manager');
require('./models/Canteen');
require('./models/StockUsage'); 

const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

(async () => {
  try {
    await connectDB();

    // --- DEBUGGING: make mongoose noisy in dev ---
    const mongoose = require('mongoose');
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true); // logs queries, populate, etc.
      console.log('🔎 Mongoose debug ON');
    }

    // --- Ensure ADMIN exists (optional) ---
    await ensureAdmin();

    const app = express();

    // --- Simple request logger (no deps) ---
    app.use((req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const ms = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`);
      });
      next();
    });

    // Core middleware
    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }));
    app.use(express.json());
    app.use(cookieParser());

    // Static
  app.use('/profile-images', express.static('profile-images'));
  app.use('/product-images', express.static('product-images'));
  app.use('/inventory-images', express.static('inventory-images'));

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/auth', profileRoutes);
  app.use('/api', uploadRoutes);
  app.use('/api', updateprfileRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api', productsRoutes);
  app.use('/api', distance);
  app.use('/api/cart', cartRoutes);
  app.use('/api/orders', orderplacement);
  app.use('/api/canteen', canteenRoutes);
  app.use('/api/inventory', inventoryRoutes);
  app.use('/api/analytics', analyticsRoutes);

    // Start scheduled expiry sweep (optional)
    try {
      const { scheduleDailySweep } = require('./services/expirySweep');
      scheduleDailySweep();
      console.log('Scheduled expiry sweep started');
    } catch (err) {
      console.error('Could not start scheduled expiry sweep', err);
    }

    // ❌ Do NOT mount a model as a router:
    // const managerprofile = require('./models/Manager');
    // app.use('/api/manager', managerprofile);
    // If you later add endpoints: const managerRoutes = require('./route/manager'); app.use('/api/manager', managerRoutes);

    // Health
    app.get('/health', (req, res) => res.json({ ok: true }));

    // 404 (after all routes)
    app.use((req, res) => {
      res.status(404).json({ message: 'Not Found', path: req.originalUrl });
    });

    // Global error handler (return stack in dev)
    // To use: throw err or next(err) anywhere
    // If a route returns res.status(500).json(...), that will bypass this (that’s fine too).
    app.use((err, req, res, next) => {
      console.error('💥 Global error:', err);
      const payload = { message: 'Internal Server Error' };
      if (process.env.NODE_ENV !== 'production') {
        payload.details = err.message;
        payload.stack = err.stack;
      }
      res.status(500).json(payload);
    });

    // Catch unhandled errors
    process.on('unhandledRejection', (reason) => {
      console.error('🧨 Unhandled Rejection:', reason);
    });
    process.on('uncaughtException', (err) => {
      console.error('🧨 Uncaught Exception:', err);
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.error('🚫 Server bootstrap failed:', e);
    process.exit(1);
  }
})();

async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const pass  = process.env.ADMIN_PASSWORD;

  if (!email || !pass) {
    console.warn('⚠️  ADMIN_EMAIL / ADMIN_PASSWORD not set; skipping admin seed');
    return;
  }

  let admin = await User.findOne({ email });
  if (!admin) {
    const hash = await bcrypt.hash(pass, 12);
    admin = await User.create({
      firstName: process.env.ADMIN_FIRST || 'Nuwanaka',
      lastName:  process.env.ADMIN_LAST  || 'Nadil',
      email,
      password: hash,
      role: 'ADMIN',
      status: 'ACTIVE',
      country: 'Sri Lanka',
      language: 'English',
      timezone: 'GMT+5:30',
    });
    console.log('✅ Admin created:', admin.email);
  } else if (admin.role !== 'ADMIN') {
    admin.role = 'ADMIN';
    await admin.save();
    console.log('✅ Admin role enforced for:', admin.email);
  } else {
    console.log('✅ Admin exists:', admin.email);
  }
}
