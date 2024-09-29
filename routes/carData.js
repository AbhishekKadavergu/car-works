// routes/carData.js
import { Router } from 'express';
import authorize from '../middleware/authorization.js';
import CarData from '../models/CarData.js';
const router = Router();

// Route to get all car data accessible to the user role
router.get('/', authorize(['data-viewer', 'admin']), async (req, res) => {
    try {
        const carData = await CarData.find({ accessibleBy: req.user.role });
        res.json(carData);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
