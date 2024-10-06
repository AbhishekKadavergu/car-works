import Part from '../models/carModel/Part.js';
import DesignSolution from '../models/carModel/DesignSolution.js';
import Car from '../models/carModel/Car.js';

// Create a Part
export const createPart = async (req, res) => {
  try {
    const { name, quantity, cost, supplier, weight, carbonFootprint, leadTime } = req.body;

    const newPart = new Part({
      name,
      quantity,
      cost,
      supplier,
      weight,
      carbonFootprint,
      leadTime,
    });

    await newPart.save();
    res.status(201).json(newPart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create part' });
  }
};

// Create a Design Solution
export const createDesignSolution = async (req, res) => {
  try {
    const { code, description, parts } = req.body;

    const newDesignSolution = new DesignSolution({
      code,
      description,
      parts, // List of part IDs
    });

    await newDesignSolution.save();
    res.status(201).json(newDesignSolution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create design solution' });
  }
};

// Create a Car
export const createCar = async (req, res) => {
  try {
    const { msn, designSolutionId, manufactureDate } = req.body;

    const newCar = new Car({
      msn,
      designSolutionId,
      manufactureDate, // Newly added field
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create car' });
  }
};

// Get BOM by Design Solution
export const getBOMByDS = async (req, res) => {
  try {
    const { dsCode } = req.params;

    // Find the design solution by its code
    const designSolution = await DesignSolution.findOne({ code: dsCode }).populate('parts', 'name quantity cost supplier leadTime');

    if (!designSolution) {
      return res.status(404).json({ message: 'Design Solution not found' });
    }

    // Summarize the BOM details from the design solution
    const bomData = {
      dsCode: designSolution.code,
      totalCost: designSolution.parts.reduce((acc, part) => acc + part.cost, 0),
      parts: designSolution.parts,
    };

    res.status(200).json(bomData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch BOM details' });
  }
};

// Get PCF by Design Solution
export const getPCFByDS = async (req, res) => {
  try {
    const { dsCode } = req.params;

    // Find the design solution by its code
    const designSolution = await DesignSolution.findOne({ code: dsCode }).populate('parts', 'name quantity weight carbonFootprint');

    if (!designSolution) {
      return res.status(404).json({ message: 'Design Solution not found' });
    }

    // Calculate the total carbon footprint for the design solution
    const pcfData = {
      dsCode: designSolution.code,
      totalPCF: designSolution.parts.reduce((acc, part) => acc + (part.carbonFootprint * part.quantity), 0),
      parts: designSolution.parts,
    };

    res.status(200).json(pcfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch PCF details' });
  }
};

// Get all dsCodes
export const getAllDSCodes = async (req, res) => {
    try {
        const dsCodes = await DesignSolution.find({}, 'code description');
        res.status(200).json(dsCodes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
