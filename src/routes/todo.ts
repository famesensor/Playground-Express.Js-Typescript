import { Router } from 'express';

const router = Router();

router.route('/').post();

router.route('/:id').get().patch().delete();

export default router;
