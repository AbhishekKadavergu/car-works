// middleware/admin.js
import User from '../models/UserModel.js'; // Import the User model

const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming the user ID is set in the authentication middleware
        const user = await User.findById(userId).populate('roles'); // Populate roles to get full role details

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if any of the user's roles have the name "admin"
        console.log(user);
        const isAdminRole = user.roles.some(role => role.name === 'admin');
        if (isAdminRole) {
            next(); // Proceed to the next middleware
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user roles.' });
    }
};

export default isAdmin;
