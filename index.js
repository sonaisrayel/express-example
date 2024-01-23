import express from "express";
const app = express();

import userRouter from './users-router.js'

//middleware

app.use(express.json())
app.use('/users', userRouter)


app.listen(3000,()=> {
    console.log(`Server started at port 3000`)
})



