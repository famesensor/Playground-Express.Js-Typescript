import asyncHandler from '../middleware/async';
import ErrorHandler from '../utils/errorReponse/errorReponse';

import { Request, Response, NextFunction } from 'express';

import { UserModel } from '../models/user';

import { UserSignup, UserSignin } from '../interfaces/user';

export const signupUser = asyncHandler(async function (req, res, next) {
    let { username, password, email }: UserSignup = req.body;

    if (!username || !password || !email) {
        return next(new ErrorHandler(`Validator error`, 400));
    }

    const exists_user = UserModel.findOne({
        $or: [{ username: username }, { email: email }]
    });
    if (!exists_user) {
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

export const signInUser = asyncHandler(async (req, res, next) => {
    let { username, password }: UserSignin = req.body;

    if (!username || !password) {
        return next(new ErrorHandler(`Validator error`, 400));
    }

    const user = await UserModel.findOne({ username: username }).select(
        '+password'
    );
    if (!user) {
        return next(new ErrorHandler(`User not found`, 404));
    }

    if (!(await user.matchPassword(password))) {
        return next(new ErrorHandler(`User not found`, 400));
    }

    let token = user.getToken();

    res.status(200).json({
        status: 'success',
        token: token
    });
});

export const getProfile = asyncHandler(async function (req, res, next) {
    let username = req.user?.username;
    let user = await UserModel.findOne({ username });
    if (!user) {
        return next(new ErrorHandler(`User not found`, 404));
    }
    res.status(200).json({
        status: 'success',
        data: user
    });
});
