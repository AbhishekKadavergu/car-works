// routes/roleRoutes.js
import express from 'express';
import { getRoles } from '../controllers/roleController.js';
import authenticate from '../middleware/auth.js'; // Import the authenticate middleware


const router = express.Router();

// Route to get all roles
router.get('/', authenticate, getRoles);

export default router;
