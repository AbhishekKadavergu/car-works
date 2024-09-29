// server.js
import express, { json } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js'; // Ensure .js extension
import authRoutes from './routes/auth.js'; // Ensure .js extension
import carDataRoutes from './routes/carData.js'; // Ensure .js extension
import Role from './models/Role.js'; // Import Role model
import User from './models/UserModel.js'; // Import User model
import roleRoutes from './routes/roleRoutes.js'; // Import the role routes
import roleRequest from './routes/roleRequests.js'; // Import the role routes
import cors from 'cors';


config();
const app = express();

// Connect to MongoDB
connectDB().catch(error => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if connection fails
});

// Middleware
app.use(json());
// Enable CORS for all routes
app.use(cors());

// Function to create admin user
async function createAdminUser() {
    try {
        const adminRole = await Role.findOne({ name: 'admin' });
        const existingAdmin = await User.findOne({ username: 'admin' });

        if (!existingAdmin) {
            const adminUser = new User({
                name: "Admin User",
                username: "admin",
                email: "admin@example.com",
                password: "AdminPassword123", // Hash this before saving
                country: "USA",
                mobile: "1234567890",
                roles: [adminRole._id], // Ensure this matches your User model
            });

            await adminUser.save();
            console.log("Admin user created successfully.");
        } else {
            console.log("Admin user already exists.");
        }
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/car-data', carDataRoutes);
// Use the role routes
app.use('/api/roles', roleRoutes); // Use /api prefix for role-related routes
app.use('/api/request', roleRequest); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await createAdminUser(); // Create admin user if it doesn't exist
});
