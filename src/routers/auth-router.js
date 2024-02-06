import router from './users-router.js';
import { User } from '../models/user-model.js';


router.post('/login');

router.post('/registration', async (req, res) => {
    try {
        const { username, email, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            throw new Error('Passwords doesnt match');
        }

        const response = await User.create({ username, email, password });
        res.status(201).send({ data: response });
    } catch (e) {
        res.status(401).send({ data: e.message });
    }
});

export default router;
