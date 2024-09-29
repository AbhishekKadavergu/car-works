// models/CarData.js
import { Schema, model } from 'mongoose';

const CarDataSchema = new Schema({
    carModel: { type: String, required: true },
    manufacturer: { type: String, required: true },
    productionYear: { type: Number, required: true },
    emissions: { type: Number, required: true },  // Carbon emissions
    accessibleBy: [String],  // Roles allowed to view/edit
});

const CarData = model('CarData', CarDataSchema);
export default CarData;
