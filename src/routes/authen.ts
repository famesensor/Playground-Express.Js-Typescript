import express from 'express';

import { signupUser } from '../controller/authen';

const router = express.Router();

router.route('/').post(signupUser);

export default router;
