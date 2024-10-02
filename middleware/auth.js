// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// Middleware to authenticate and attach user to req
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here

    // Fetch user from database (optional but useful)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Attach user info to the request
    req.user = user;
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authenticate;
