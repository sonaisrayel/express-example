import { Router } from 'express';
const router = Router();

import { getTodo, getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todo-controller.js';

router.get('/', getTodos);
router.get('/:id', getTodo);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
