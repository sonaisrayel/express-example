import moment from 'moment';
import { Todo } from '../models/todo-model.js';
import ResponseHandler from '../utils/ResponseHandler.js';

export const getTodos = async (req, res) => {
    try {
        const { userInfo } = req;
        if (!userInfo) {
            return ResponseHandler.handleErrorResponse('User info not provided !!!', res);
        }
        const todo = await Todo.find({ contributor: userInfo._id });

        return ResponseHandler.handleGetResponse(res, todo);
    } catch (e) {
        return ResponseHandler.handleErrorResponse(e.message, res);
    }
};

export const getTodo = async (req, res) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;
        const todo = await Todo.find({ _id: id });

        if (todo.contributor !== userInfo.id) {
            return ResponseHandler.handleErrorResponse('You are not allow to read this todo', res);
        }

        return ResponseHandler.handleGetResponse(res, todo);
    } catch (e) {
        return ResponseHandler.handleErrorResponse(e.message, res);
    }
};

export const createTodo = async (req, res) => {
    try {
        const { userInfo } = req;
        const { title, description, storyPoints } = req.body;

        console.log(userInfo,'userInfo');

        if (!userInfo) {
            return ResponseHandler.handleErrorResponse('You are not authorized!!!', res);
        }

        const deadline = moment().add(Number(storyPoints), 'days').format('YYYY-MM-DD');
        await Todo.create({ title, description, contributor: userInfo._id, storyPoints, deadline });
        const todo = await Todo.find({ title });
        return ResponseHandler.handlePostResponse(res, todo);
    } catch (e) {
        return ResponseHandler.handleErrorResponse(e.message, res);
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;
        const payload = req.body;

        const updatedTodo = await Todo.findOneAndUpdate({ _id: id, contributor: userInfo._id }, payload, { new: true });

        if (!updatedTodo) {
            return ResponseHandler.handleErrorResponse('You are not owner of this todo!!!', res);
        }
        return ResponseHandler.handlePostResponse(res, updatedTodo);
    } catch (e) {
        return ResponseHandler.handleErrorResponse(e.message, res);
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;

        const deleteTodo = await Todo.findOneAndDelete({ _id: id, contributor: userInfo._id });

        if (!deleteTodo) {
            return ResponseHandler.handleErrorResponse('Todo is not found!!!', res);
        }
        return ResponseHandler.handleDeleteResponse(res, deleteTodo);
    } catch (e) {
        return ResponseHandler.handleErrorResponse(e.message, res);
    }
};
