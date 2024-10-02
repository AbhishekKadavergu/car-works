// controllers/roleController.js
import Role from '../models/Role.js';
import RoleRequest from '../models/RoleRequest.js';
import User from '../models/UserModel.js';

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Create a new role request
export const createRoleRequest = async (req, res) => {
  try {
    const { roleId, comment } = req.body;
    const userId = req.user.id; // Get the user ID from the authenticated request

    // Check if a role request for the same user and role already exists
    const existingRequest = await RoleRequest.findOne({
      user: userId,
      role: roleId,
      status: { $in: ['pending', 'approved'] } // Assuming you have a status field
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You have already requested this role.' });
    }

    // Proceed to create a new role request
    const roleRequest = new RoleRequest({
      user: userId,
      role: roleId,
      comment, // Storing the reason for the request
      createdAt: Date.now(),
      status: 'pending' // Assuming default status is 'pending'
    });

    await roleRequest.save();
    res.status(201).json({ message: 'Role request submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role request.' });
  }
};

// Get all role requests for the logged-in user
export const getUserRoleRequests = async (req, res) => {
  try {
    console.log(req.user)
    const userId = req.user.id;
    const roleRequests = await RoleRequest.find({ user: userId })
      .populate('role', 'name') // Populate role details
      .sort({ createdAt: -1 }); // Sort by latest first

    res.status(200).json(roleRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role requests.' });
  }
};

