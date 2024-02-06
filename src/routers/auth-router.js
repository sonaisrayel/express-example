import router from './users-router.js';
import { login, registration } from '../controllers/auth-controller.js';

router.post('/login', login);

router.post('/registration', registration);

export default router;
