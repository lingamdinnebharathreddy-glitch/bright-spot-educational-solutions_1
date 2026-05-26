import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'bright_spot_secret_key_12345';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Fetch user using our proxy which works with both Mongo and JSON fallback DBs
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found, authorization failed.' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication token validation failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided.' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
  }
};

export default {
  protect,
  admin
};
