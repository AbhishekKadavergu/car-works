// routes/roleRequests.js
import express from 'express';
import { createRoleRequest, getUserRoleRequests } from '../controllers/roleController.js';
import authenticate  from '../middleware/auth.js'; // Authentication middleware

const router = express.Router();


router.post('/role-request', authenticate, createRoleRequest); // Role request creation route
router.get('/role-requests', authenticate, getUserRoleRequests); // Fetch all requests for the user

export default router;
