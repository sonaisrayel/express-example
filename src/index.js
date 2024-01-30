import express from "express";
const app = express();
import { connection }  from "./storages/db.js";


connection()


import userRouter from '../src/routers/users-router.js'
import todoRouter from '../src/routers/todo-router.js'
import authRouter from '../src/routers/auth-router.js'


//middleware

app.use(express.json())
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/todos', todoRouter)


app.listen(3000,()=> {
    console.log(`Server started at port 3000`)
})



