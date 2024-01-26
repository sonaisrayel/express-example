import {create, get} from "./storages/mongodb.js";
import router from "./users-router.js";


router.post('/login', async (req,res)=> {
    try{
        const { email} = req.body;
        const user = await get({ email })
        res.status(201).send({data:user})
    } catch (e) {
        res.status(404).send({data:e.message})
    }
})

router.post('/registration',async (req,res) => {
    try {
        const { username, email, userType } = req.body
        const response = await create({username, email, userType})
        res.status(201).send({data: response})
    } catch (e) {
        res.status(404).send({data:e.message})
    }

})

export default router
