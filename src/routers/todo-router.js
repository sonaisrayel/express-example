import moment from 'moment'
import JWT from 'jsonwebtoken';
import { Router } from 'express'
const router = Router()

import { Todo } from '../models/todo-model.js';

router.post('/',async (req,res)=> {
    try {
        const { authorization } = req.headers;
        const { title,description,storyPoints } = req.body

        const user = JWT.verify(authorization,'bubu');
        const deadline = moment().add(Number(storyPoints),'days').format('YYYY-MM-DD');
        await Todo.create({ title,description,contributor:user._id, storyPoints,deadline})
        const todo = await Todo.find({title})
        res.status(201).send({ data:todo })
    } catch (e) {
        res.status(404).send({data:e.message})
    }
})


router.get('/',async (req,res) => {
    try {
        const filter= req.query
        const { authorization } = req.headers;

        const user = JWT.verify(authorization,'bubu');
        const  todo = await Todo.find(filter);

        if(user.id !== todo[0].contributor){
          throw new Error("You are no allow to read  others todos")
        }

        res.status(201).send({data:todo})

    } catch(e){
        res.status(404).send({data:e.message})
    }
})

// router.delete('/',async (req,res)=> {
//     try {
//         const { email } = req.body;
//         const deletedUser = await del('users', email );
//         res.status(200).send({ data:deletedUser })
//     } catch (e) {
//         res.status(404).send(e.message)
//     }
//
// })

// router.put('/',async (req,res)=> {
//     try {
//         const { email,username } = req.body
//         await update('users',{email},{username})
//         res.status(204).send({data:"User successfully updated"})
//     } catch (e) {
//         res.status(404).send({data:"User is not updated!!!!"})
//     }
// })



export default router

