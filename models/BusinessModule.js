// models/BusinessModule.js
import { Schema, model } from 'mongoose';

const BusinessModuleSchema = new Schema({
    name: { type: String, required: true, unique: true }, // e.g., 'Product Carbon Footprint'
    description: { type: String }, // Description of the module
});

const BusinessModule = model('BusinessModule', BusinessModuleSchema);
export default BusinessModule;
