export const isAdmin = (req,res,next) => {
    const {userType} =  req.body
    if(userType !=='admin'){
       return res.status(404).send('You are not admin')
    }
    next()
}

