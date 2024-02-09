import { Router } from 'express';
const router = Router();

import { getTodo, createTodo } from '../controllers/todo-controller.js';

router.post('/', createTodo);

router.get('/', getTodo);

export default router;
