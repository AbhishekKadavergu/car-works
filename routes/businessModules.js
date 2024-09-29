// routes/businessModules.js
import express from 'express';
import BusinessModule from '../models/BusinessModule.js';

const router = express.Router();

// Create a new business module
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    const module = new BusinessModule({ name, description });
    await module.save();
    return res.status(201).json({ message: "Business module created successfully." });
});

// Get all business modules
router.get('/', async (req, res) => {
    const modules = await BusinessModule.find();
    return res.status(200).json(modules);
});

export default router;
