import router from "./users-router.js";
import JWT from 'jsonwebtoken';
import { User } from '../models/user-model.js';

const  { SECRET } = process.env

router.post('/login', async (req,res)=> {
    try{
        const { email,password } = req.body;
        const user = await User.find({ email,password }).select('-password');

        if (!user.length){
            throw new Error("You are not registered!!!")
        }

        const [userInfo] = user
        const token =  JWT.sign({_id:userInfo._id,email,username:userInfo.username }, SECRET,{expiresIn: '15d'})
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
