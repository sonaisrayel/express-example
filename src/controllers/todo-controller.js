import moment from 'moment';
import { Todo } from '../models/todo-model.js';
import ResponseHandler from '../utils/ResponseHandler.js';

export const getTodos = async (req, res) => {
    try {
        const { userInfo } = req;
        if(!userInfo){
            throw new Error("user info not provided!!!!")
        }
        const todo = await Todo.find({ contributor: userInfo._id });

        return ResponseHandler.handleGetResponse(res, todo);
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};

export const getTodo = async (req, res) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;
        const todo = await Todo.find({ _id: id });

        if (todo.contributor !== userInfo.id) {
            throw new Error('You are not allow to read this todo');
        }

        return ResponseHandler.handleGetResponse(res, todo);
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};

export const createTodo = async (req, res) => {
    try {
        const { userInfo } = req;
        const { title, description, storyPoints } = req.body;
        if (!userInfo) {
            throw new Error('You are not authorized!!!');
        }

        const deadline = moment().add(Number(storyPoints), 'days').format('YYYY-MM-DD');
        await Todo.create({ title, description, contributor: userInfo.id, storyPoints, deadline });
        const todo = await Todo.find({ title });
        return ResponseHandler.handlePostResponse(res, todo);
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;
        const payload = req.body;

        const updatedTodo = await Todo.findOneAndUpdate({ _id: id, contributor: userInfo._id }, payload, { new: true });

        if (!updatedTodo) {
            throw new Error('You are not owner of this todo!!!');
        }
        return ResponseHandler.handlePostResponse(res, updatedTodo);
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;

        const deleteTodo = await Todo.findOneAndDelete({ _id: id, contributor: userInfo._id });
        if (!deleteTodo) {
            throw new Error('Todo is not found!!!');
        }
        return ResponseHandler.handleDeleteResponse(res, deleteTodo);
    } catch (e) {
        res.status(404).send({ data: e.message });
    }
};
