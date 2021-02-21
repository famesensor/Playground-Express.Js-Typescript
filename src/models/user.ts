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
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
