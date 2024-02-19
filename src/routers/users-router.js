import { Router } from 'express';
const router = Router();

import { getUser } from '../controllers/users-controller.js';

router.get('/', getUser);

export default router;
