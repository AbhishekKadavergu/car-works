import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  msn: { type: String, required: true, unique: true }, // Manufacturing Serial Number
  designSolutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'DesignSolution', required: true },
  manufactureDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Car = mongoose.model('Car', carSchema);
export default Car;
