const express = require('express');
const {userRouter} = require("./controller/routes/manualLogin.route")
const {connection}=require('./db');
const app = express();
require('dotenv').config();
const PORT=process.env.PORT;

const cors=require('cors');



app.use(cors())
app.use(express.json());


app.use('/users', userRouter);



app.listen(PORT,async()=>{
    try{
         await connection
         console.log("connected to db")
         console.log("server is running at port 4400");
    }catch(err){
        console.log(err);
    }
    
})