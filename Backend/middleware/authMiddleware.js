const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.cookies?.token;
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'Unauthorized: no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;            // { userId, email, role, ... }
    req.userId = decoded.userId;
    req.userRole = decoded.role;   // 👈 requireRole will read this
    next();
  } catch (err) {
    console.error('JWT verify failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
