import 'dotenv/config';

import express from 'express';
const app = express();

import { connection } from './storages/db.js';
import Authorization from './middlewares/Authorization.js';
const { PORT } = process.env;

connection();

import userRouter from '../src/routers/users-router.js';
import todoRouter from '../src/routers/todo-router.js';
import authRouter from '../src/routers/auth-router.js';

//middleware

app.use(express.json());
app.use('/auth', authRouter);

app.use(Authorization.authorized);
app.use('/users', userRouter);
app.use('/todos', todoRouter);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
