import mongoose, { Schema, Document, Model, model } from 'mongoose';

// TODO: handler validate value
const ProfileSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
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
