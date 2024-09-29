// models/Role.js
import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    name: { type: String, required: true, unique: true }, // e.g., 'data-viewer'
    permissions: { type: [String], required: true }, // Permissions for the role
});

const Role = model('Role', RoleSchema);
export default Role;
