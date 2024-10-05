import mongoose from 'mongoose';

const partSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  weight: { type: Number, required: true }, // For PCF calculation
  carbonFootprint: { type: Number, required: true }, // PCF-related field
  cost: { type: Number, required: true }, // BOM-related field
  supplier: { type: String }, // BOM-related field
  leadTime: { type: String }, // BOM-related field
});

const Part = mongoose.model('Part', partSchema);

export default Part;
