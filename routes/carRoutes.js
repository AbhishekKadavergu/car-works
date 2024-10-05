import express from 'express';
import {
  createPart,
  createDesignSolution,
  createCar,
  getBOMByDS,
  getPCFByDS,
} from '../controllers/carController.js';

const router = express.Router();

// Routes for creating part, design solution, and car
router.post('/part', createPart);
router.post('/design-solution', createDesignSolution);
router.post('/create-car', createCar);

// Routes for getting BOM and PCF by Design Solution code
router.get('/bom-by-ds/:dsCode', getBOMByDS);
router.get('/pcf-by-ds/:dsCode', getPCFByDS);

export default router;
