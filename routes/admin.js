import express from 'express';
import isAdmin from '../middleware/admin.js';
import RoleRequest from '../models/RoleRequest.js';
import User from '../models/UserModel.js';
import authenticate from '../middleware/auth.js'; // Authentication middleware

const router = express.Router();

// Admin approves a role request
router.post('/approve/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const roleRequest = await RoleRequest.findByIdAndUpdate(id, { status: 'approved' }, { new: true });

        // Assign the role to the user
        const user = await User.findById(roleRequest.user);
        user.roles.push(roleRequest.role);
        await user.save();

        return res.status(200).json({ message: "Role request approved." });
    } catch (error) {
        return res.status(500).json({ message: "Error approving role request." });
    }
});

// Admin rejects a role request
router.post('/reject/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await RoleRequest.findByIdAndUpdate(id, { status: 'rejected' });
        return res.status(200).json({ message: "Role request rejected." });
    } catch (error) {
        return res.status(500).json({ message: "Error rejecting role request." });
    }
});

// Admin revokes an approved role request
router.post('/revoke/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const roleRequest = await RoleRequest.findByIdAndUpdate(id, { status: 'revoked' }, { new: true });

        // Remove the role from the user
        const user = await User.findById(roleRequest.user);
        user.roles = user.roles.filter(role => role.toString() !== roleRequest.role.toString());
        await user.save();

        return res.status(200).json({ message: "Role request revoked." });
    } catch (error) {
        return res.status(500).json({ message: "Error revoking role request." });
    }
});

// Get all incoming role requests for admin
router.get('/requests', authenticate, isAdmin, async (req, res) => {
    try {
        const requests = await RoleRequest.find()
            .populate('user role');

        // Filter out requests where the user object is null after population
        const validRequests = requests.filter(request => request.user !== null);

        if (validRequests.length === 0) {
            return res.status(200).json({
                success: true,
                data: null,
                message: "No role requests found."
            });
        }

        return res.status(200).json({
            success: true,
            data: validRequests,
            message: "Role requests fetched successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error fetching role requests."
        });
    }
});

export default router;
