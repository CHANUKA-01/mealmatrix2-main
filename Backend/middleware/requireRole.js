// middleware/requireRole.js
module.exports = function requireRole(...allowed) {
  return (req, res, next) => {
    const role = req.userRole; // set by your auth middleware after verifying JWT
    if (!role || !allowed.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
