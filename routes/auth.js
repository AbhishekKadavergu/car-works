import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import JWT
import User from '../models/UserModel.js';
import Role from '../models/Role.js';

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    const { name, username, email, password, country, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, username, email, password: hashedPassword, country, mobile });
    await user.save();
    return res.status(201).json({ message: "User registered successfully." });
});


// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
        try {
            // Fetch role names from Role table based on user role references
            const roles = await Role.find({ _id: { $in: user.roles } }); // Assuming user.roles is an array of role IDs

            // Extract role names
            const roleNames = roles.map(role => role.name);

            // Generate JWT Token, including role names if necessary
            const token = jwt.sign(
                { id: user._id, email: user.email, roles: roleNames }, // Include role names in the token
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Send token and user info to frontend, including role names
            return res.status(200).json({
                message: "Login successful.",
                token, // Send the token
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    roles: roleNames // Include role names in the response
                }
            });
        } catch (error) {
            return res.status(500).json({ message: "Error fetching roles", error });
        }
    }

    return res.status(401).json({ message: "Invalid email or password." });
});


export default router;
