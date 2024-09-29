// middleware/auth.js
import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer token

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        console.log(token);
        console.log(process.env.JWT_SECRET);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info from token to request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

export default protect;
