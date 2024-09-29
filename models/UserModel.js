// models/User.js
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;


const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /.+\@.+\..+/,
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6,
    },
    country: { type: String, required: true },
    mobile: { 
        type: String, 
        required: true,
        match: /^\d{10}$/,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
});

// Password matching method
UserSchema.methods.matchPassword = async function (password) {
    return await compare(password, this.password);
};

const User = model('User', UserSchema);
export default User;
