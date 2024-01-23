import { Router } from 'express'
const router = Router()
import { isAdmin } from './middlewars/middlwares.js';
import { getUsers,getUser,updateUser,deleteUser }  from './storages/mongodb.js';

router.get('/:email?',async (req,res) => {
    try {
        const { email } = req.params
        const  users = email ? await getUser({ email }) : await getUsers();
        res.status(201).send({data:users})
    } catch(e){
        res.status(404).send({data:'Something happened'})
    }
})


router.delete('/',async (req,res)=> {
    try {
        const { email } = req.body;
        const deletedUser = await deleteUser({ email });
        res.status(200).send({ data:deletedUser })
    } catch (e) {
        res.status(404).send(e.message)
    }

})

router.put('/',async (req,res)=> {
    try {
        const { email,username } = req.body
        await updateUser({email},{username})
        res.status(204).send({data:"User successfully updated"})

    } catch (e) {
       res.status(404).send({data:"User is not updated!!!!"})
    }
})



export default router





