import express from 'express';

import { signupUser, signInUser, getProfile } from '../controller/authen';
import { protect } from '../middleware/authen';

const router = express.Router();

router.route('/').post(signupUser).get(protect, getProfile);

router.route('/signin').post(signInUser);

export default router;
