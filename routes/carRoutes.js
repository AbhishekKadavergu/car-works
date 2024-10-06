import express from 'express';
import {
  createPart,
  createDesignSolution,
  createCar,
  getBOMByDS,
  getPCFByDS,
  getAllDSCodes
} from '../controllers/carController.js';
import authenticate  from '../middleware/auth.js'; // Authentication middleware
import roleCheck from '../middleware/roleCheck.js';



const router = express.Router();

// Routes for creating part, design solution, and car
router.post('/part', authenticate, createPart);
router.post('/design-solution', authenticate, createDesignSolution);
router.post('/create-car', authenticate, createCar);

// Routes for getting BOM and PCF by Design Solution code
router.get('/bom-by-ds/:dsCode', authenticate, roleCheck('bom-viewer'), getBOMByDS);
router.get('/pcf-by-ds/:dsCode', authenticate, roleCheck('pcf-viewer'), getPCFByDS);
// Route to get all dsCodes
router.get('/ds-codes', authenticate, getAllDSCodes);

export default router;
