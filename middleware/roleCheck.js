// middleware/roleCheck.js
import jwt from 'jsonwebtoken';

const roleCheck = (requiredRole) => {
    return (req, res, next) => {
        try {
            // Assuming token is in the Authorization header
            const token = req.headers.authorization.split(" ")[1]; 
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 

            // Access the user's roles (decodedToken must have roles)
            const userRoles = decodedToken.roles; 

            if (userRoles.includes(requiredRole)) {
                // User has the required role, proceed
                next();
            } else {
                // User doesn't have the required role
                return res.status(403).json({ message: "Access Denied: You don't have the required role." });
            }
        } catch (error) {
            return res.status(401).json({ message: "Authentication failed!" });
        }
    };
};

export default roleCheck;
