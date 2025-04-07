const jwt = require('jsonwebtoken');

const protect = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient rights' });
      }

      next();
    } catch {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = protect;
