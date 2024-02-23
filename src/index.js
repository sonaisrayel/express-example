import 'dotenv/config';

import express from 'express';
const app = express();

import { connection } from './storages/db.js';
import Authorization from './middlewares/Authorization.js';
import ErrorMiddleware from './middlewares/ErrorMiddleware.js';
const { PORT } = process.env;

connection();

import todoRouter from '../src/routers/todo-router.js';
import authRouter from '../src/routers/auth-router.js';


app.use(express.json());
app.use('/auth', authRouter);

app.use(Authorization.authorized);

app.use('/todos', todoRouter);

app.use(ErrorMiddleware.customError);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
