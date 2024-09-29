// models/RoleRequest.js
import { Schema, model } from 'mongoose';

const RoleRequestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'revoked'], default: 'pending' },
    comment: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date}
});

const RoleRequest = model('RoleRequest', RoleRequestSchema);
export default RoleRequest;
