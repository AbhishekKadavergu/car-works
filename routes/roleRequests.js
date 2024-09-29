// routes/roleRequests.js
import express from 'express';
import RoleRequest from '../models/RoleRequest.js';
import User from '../models/UserModel.js';
import { createRoleRequest, getUserRoleRequests } from '../controllers/roleController.js';
import protect  from '../middleware/auth.js'; // Authentication middleware

const router = express.Router();


router.post('/role-request', protect, createRoleRequest); // Role request creation route
router.get('/role-requests', protect, getUserRoleRequests); // Fetch all requests for the user

// Admin approves a role request
router.post('/approve/:id', async (req, res) => {
    const { id } = req.params;
    const roleRequest = await RoleRequest.findByIdAndUpdate(id, { status: 'approved' }, { new: true });

    // Assign the role to the user
    const user = await User.findById(roleRequest.user);
    user.roles.push(roleRequest.role);
    await user.save();

    return res.status(200).json({ message: "Role request approved." });
});

// Admin rejects a role request
router.post('/reject/:id', async (req, res) => {
    const { id } = req.params;
    await RoleRequest.findByIdAndUpdate(id, { status: 'rejected' });
    return res.status(200).json({ message: "Role request rejected." });
});

// Get all incoming role requests for admin
router.get('/requests', async (req, res) => {
    const requests = await RoleRequest.find().populate('user role');
    return res.status(200).json(requests);
});

export default router;
