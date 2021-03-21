import asyncHandler from '../middleware/async';
import ErrorHandler from '../utils/errorReponse/errorReponse';

import { Request, Response, NextFunction } from 'express';

import { UserModel } from '../models/user';

import { UserSignup } from '../interfaces/user';

export const signupUser = asyncHandler(async function (req, res, next) {
    let { username, password, email }: UserSignup = req.body;

    const exists_user = UserModel.findOne({
        $or: [{ username: username }, { email: email }]
    });
    if (exists_user) {
        return next(new ErrorHandler(`User already exist`, 400));
    }

    let userModel = new UserModel({
        username,
        password,
        email
    });

    userModel.picture = userModel.gravatar(10);
    await userModel.save();

    res.status(201).json({
        status: 'success'
    });
});
