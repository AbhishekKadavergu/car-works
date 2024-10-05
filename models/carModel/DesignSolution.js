import mongoose from 'mongoose';

const designSolutionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true }], // List of parts for this DS
  createdAt: { type: Date, default: Date.now },
});

const DesignSolution = mongoose.model('DesignSolution', designSolutionSchema);

export default DesignSolution;
