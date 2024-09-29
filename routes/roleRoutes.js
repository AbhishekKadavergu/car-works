// routes/roleRoutes.js
import express from 'express';
import { getRoles } from '../controllers/roleController.js';
import protect from '../middleware/auth.js'; // Import the protect middleware


const router = express.Router();

// Route to get all roles
router.get('/', protect, getRoles);

export default router;
