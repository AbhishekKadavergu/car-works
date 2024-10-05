// server.js
import express, { json } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js'; // Ensure .js extension
import authRoutes from './routes/auth.js'; // Ensure .js extension
import Role from './models/Role.js'; // Import Role model
import User from './models/UserModel.js'; // Import User model
import roleRoutes from './routes/roleRoutes.js'; // Import the role routes
import roleRequest from './routes/roleRequests.js'; // Import the role routes
import adminRoutes from './routes/admin.js'; // Import the role routes
import carRoutes from './routes/carRoutes.js'; // Import the role routes
import cors from 'cors';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';




config();
const app = express();

// Connect to MongoDB
connectDB().catch(error => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if connection fails
});

// Middleware
app.use(json());
// Middleware to parse JSON
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());

// Function to create admin user
async function createAdminUser() {
    try {
        const adminRole = await Role.findOne({ name: 'admin' });
        const existingAdmin = await User.findOne({ username: 'abhishekkadavergu' });
        const hashedPassword = await bcrypt.hash('Abhi@1289', 10);

        if (!existingAdmin) {
            const adminUser = new User({
                name: "Abhishek Kadavergu",
                username: "abhishekkadavergu",
                email: "abhishekkadavergu@gmail.com",
                password: hashedPassword, // Hash this before saving
                country: "India",
                mobile: "8885135781",
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
// Use the role routes
app.use('/api/roles', roleRoutes); // Use /api prefix for role-related routes
app.use('/api/request', roleRequest); 
app.use('/api/admin', adminRoutes); 
app.use('/api/car', carRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await createAdminUser(); // Create admin user if it doesn't exist
});
