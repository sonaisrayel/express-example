import moment from 'moment';
import { Todo } from '../models/todo-model.js';
import { verifyUserToken } from '../libs/jwt-lib.js';

export const getTodo = async (req, res) => {
    try {
        const filter = req.query;
        const { authorization } = req.headers;
        const user = verifyUserToken(authorization);
        const todo = await Todo.find(filter);
        const [data] = todo;
        if (user.id !== data.contributor) {
            throw new Error('You are not allowed to read  others todos');
        }

        res.status(201).send({ data: todo });
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};

export const createTodo = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const { title, description, storyPoints } = req.body;
        const user = verifyUserToken(authorization);
        const deadline = moment().add(Number(storyPoints), 'days').format('YYYY-MM-DD');
        await Todo.create({ title, description, contributor: user._id, storyPoints, deadline });
        const todo = await Todo.find({ title });
        res.status(201).send({ data: todo });
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};
