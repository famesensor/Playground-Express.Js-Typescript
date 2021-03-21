import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mongoose, { Schema, Document, Model, model } from 'mongoose';
import { UserSignup } from '../interfaces/user';

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, `Username is required`],
        minlength: 6,
        unique: true
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        minlength: 6,
        select: false
    },
    email: {
        type: String,
        required: [true, `Email is required`],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, `Email error`]
    },
    picture: {
        type: String,
        required: [true, `Picture is required`]
    },
    role: {
        type: String,
        default: `user`
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// instance methods
interface IUserModel extends UserSignup, Document {
    matchPassword(enteredPassword: string): Promise<boolean>;
    gravatar(size: number): string;
}

UserSchema.pre<IUserModel>('save', async function save(next): Promise<void> {
    if (!this.isModified('password')) next();

    const salt: string = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.gravatar = function (size: number): string {
    if (!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const UserModel: Model<IUserModel> = model<IUserModel>(
    'User',
    UserSchema
);
