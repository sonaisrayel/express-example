import { Router } from 'express'
const router = Router()
import { User } from '../models/user-model.js';

router.get ('/',async (req,res) => {
    try {
        const filter  = req.query
        const users = filter ? await User.find(filter) : await User.find({})
        res.status(201).send({ data:users })
    } catch(e){
        res.status(404).send({data:'Something happened'})
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
//
// router.put('/',async (req,res)=> {
//     try {
//         const { email,username } = req.body
//         await update('users',{email},{username})
//         res.status(204).send({data:"User successfully updated"})
//     } catch (e) {
//        res.status(404).send({data:"User is not updated!!!!"})
//     }
// })

export default router





