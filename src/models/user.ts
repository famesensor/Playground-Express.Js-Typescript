import bcrypt from 'bcryptjs';
import mongoose, { Schema, Document, Model, model } from 'mongoose';

// TODO: handler validate value
const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

interface IUser extends Document {
    username: String;
    password: String;
}

interface IUserModel extends IUser {
    macthPassword(password: String): Promise<boolean>;
}

UserSchema.pre<IUserModel>('save', async function (next): Promise<void> {
    if (!this.isModified('password')) {
        next();
    }
    const salt: String = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const userModel = model<IUserModel>('User', UserSchema);
