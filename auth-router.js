import {create, get} from "./storages/mongodb.js";
import router from "./users-router.js";
import JWT from 'jsonwebtoken';
const secret = 'bubu'


router.post('/login', async (req,res)=> {
    try{
        const { email} = req.body;
        const user = await get('users',email)

        const userEmail =  user.email;
        const username =   user.username

        const token =  JWT.sign({email:userEmail,username,ownerId:user._id},secret,{expiresIn: '15m'})
        res.status(201).send({data:user,token})
    } catch (e) {
        res.status(404).send({data:e.message})
    }
})

router.post('/registration',async (req,res) => {
    try {
        const { username, email, password  } = req.body
        const response = await create("users",{username, email, password});
        res.status(201).send({data: response});
    } catch (e) {
        res.status(404).send({data:e.message})
    }

})

export default router
