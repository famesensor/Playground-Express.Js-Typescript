import { Router } from 'express';

import {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} from '../controller/todos';
const router = Router();

router.route('/').post(createTodo).get(getTodos);

router.route('/:id').get().patch(updateTodo).delete(deleteTodo);

export default router;
