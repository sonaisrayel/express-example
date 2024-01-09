import express from "express";
const app = express();
import bodyParser from 'body-parser';

//middleware
// app.use(bodyParser.json())
app.use(express.json())

// post - req.body
// get - params - localhost:3000/5/John  ( /:age/:name )
// get - query  - localhost:3000?age=4&name=John  ('/')

app.get("/", (req,res)=> {
    const { age,name } = req.query
    res.status(201).send({age,name})
})

app.post('/',(req,res)=> {
    console.log(req.body)
    res.status(201).end()
})

app.listen(3000,()=> {
    console.log(`Server started at port 3000`)
})



