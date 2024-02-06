import { User } from '../models/user-model.js';
import JWT from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({ email, password }).select('-password');

        if (!user.length) {
            throw new Error('You are not registered!!!');
        }

        const [userInfo] = user;
        const token = JWT.sign({ _id: userInfo._id, email, username: userInfo.username }, SECRET, { expiresIn: '15d' });
        res.status(201).send({ data: user, token });
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};
