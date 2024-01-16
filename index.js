import express from "express";
const app = express();
import bodyParser from 'body-parser';

import userRouter from './users-router.js'
import test from './test.js'
import { bubu } from './test.js'

//middleware
// app.use(bodyParser.json())
app.use(express.json())
app.use('/user', userRouter)


const checkUser = function (req, res, next) {
   // console.log(req.body,'req.body1')
   const { name } = req.body
    if(name !== 'John'){
     return  res.status(404).send('User not defined!!!')
    }
    next()
}

const changeBody = function(req,res,next){
    req.body.middleName = "John the Greate"
    next()
}


const handlePost = (req,res)  => {
    const {name,surname,middleName} = req.body;
    res.status(201).send({name,surname,middleName})
}

app.post('/', checkUser,changeBody,handlePost)

// post - req.body
// get - params - localhost:3000/5/John  ( /:age/:name )
// get - query  - localhost:3000?age=4&name=John  ('/')

app.get("/",  (req,res)=> {
    const { age,name } = req.query
    res.status(201).send({age,name})
})

app.listen(3000,()=> {
    console.log(`Server started at port 3000`)
})



