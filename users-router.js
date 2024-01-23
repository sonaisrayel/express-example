import { Router } from 'express'
const router = Router()
import { isAdmin } from './middlewars/middlwares.js';
import { getUsers,createUsers,getUser }  from './storages/mongodb.js';


router.get('/',async (req,res) => {
    try {
        const users = await getUsers();
        res.status(201).send({data:users})
    } catch(e){
        res.status(404).send({data:'Something happened'})
    }
})


router.post('/registration',async (req,res) => {
    try {
        const { username, email, userType } = req.body
        const response = await createUsers({username, email, userType})

        res.status(201).send({data: response})
    } catch (e) {
        res.status(404).send({data:e.message})
    }

})


router.post('/login', async (req,res)=> {
    try{
        const { email,username } = req.body;
        const user = await getUser({ email, username })
        res.status(201).send({data:user})
    } catch (e) {
        res.status(404).send({data:e.message})
    }
})

export default router





