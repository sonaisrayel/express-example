import { User } from '../models/user-model.js';

export const getUser = async (req, res) => {
    try {
        const filter = req.query;
        const users = filter ? await User.find(filter) : await User.find({});
        res.status(201).send({ data: users });
    } catch (e) {
        res.status(404).send({ data: 'Something happened' });
    }
};
