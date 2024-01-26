import { Router } from 'express'
const router = Router()
import {get, update, del, create} from './storages/mongodb.js';
import moment from 'moment'

import JWT from 'jsonwebtoken';





router.post('/',async (req,res)=> {
    try {
        const { authorization } = req.headers;
        const user = JWT.verify(authorization,'bubu');
        const { title,description,storyPoints } = req.body
        const creationDate = moment().format('YYYY-MM-DD');
        const deadline = moment().add(Number(storyPoints),'days').format('YYYY-MM-DD');
        await create('todos',{ title,description,creationDate,deadline,completed:false, ownerId:user.ownerId })
        res.status(204).send({data:"Todo successfully created"})
    } catch (e) {
        res.status(404).send({data:"Todo is not created!!!!"})
    }
})

//
// router.get('/:email?',async (req,res) => {
//     try {
//         const { email } = req.params
//         const  users = await get('users', email);
//         res.status(201).send({data:users})
//     } catch(e){
//         res.status(404).send({data:'Something happened'})
//     }
// })

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

