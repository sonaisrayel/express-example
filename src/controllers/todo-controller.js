import moment from 'moment';
import { Todo } from '../models/todo-model.js';
import { verifyUserToken } from '../libs/jwt-lib.js';
import ResponseHandler from '../utils/ResponseHandler.js';

export const getTodo = async (req, res) => {
    try {
        const filter = req.query;
        const { authorization } = req.headers;
        const user = verifyUserToken(authorization);
        const todo = await Todo.find(filter);
        const [data] = todo;
        if (user.id !== data.contributor) {
            throw new Error('You are not owner of this post');
        }
        return ResponseHandler.handleGetResponse(res, todo);
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};

export const createTodo = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const { title, description, storyPoints } = req.body;
        const user = await verifyUserToken(authorization);
        if (!user) {
            throw new Error('You are not authorized!!!');
        }

        const deadline = moment().add(Number(storyPoints), 'days').format('YYYY-MM-DD');
        await Todo.create({ title, description, contributor: user._id, storyPoints, deadline });
        const todo = await Todo.find({ title });
        return ResponseHandler.handlePostResponse(res, todo);
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};
