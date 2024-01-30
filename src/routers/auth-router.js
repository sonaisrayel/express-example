import router from "./users-router.js";
import JWT from 'jsonwebtoken';
import { User } from '../models/user-model.js';

const secret = 'bubu'

router.post('/login', async (req,res)=> {
    try{
        const { email,password } = req.body;
        const user = await User.find({ email,password })

        if(!user.length){
            throw new Error("You are not registrated!!!")
        }

        const [userInfo] = user
        const token =  JWT.sign({ email,username:userInfo.username }, secret,{expiresIn: '15m'})
        res.status(201).send({data: user,token})
    } catch (e) {
        res.status(404).send({data:e.message})
    }
})

router.post('/registration',async (req,res) => {
    try {
        const { username, email, password,repeatPassword  } = req.body

        if (password!==repeatPassword){
            throw new Error('Passwords doesnt match')
        }

        const response = await User.create({ username, email, password });
        res.status(201).send({data: response});
    } catch (e) {
        res.status(401).send({data:e.message})
    }

})

export default router
