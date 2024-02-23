const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors=require('cors');
require('dotenv').config();

const {userRouter} = require("./controller/routes/manualLogin.route")
const facebookRouter = require('./controller/routes/facebook.route');
const googleRouter = require('./controller/routes/google.route');
const {newsRouter}=require("./controller/routes/news.routes")
const {connection}=require('./db');
const app = express();

const PORT=process.env.PORT;





app.use(cors())
app.use(express.json());
app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });


app.use('/users', userRouter);
app.use('/facebook', facebookRouter);

app.use('/google', googleRouter);
app.use("/news",newsRouter)



app.listen(PORT,async()=>{
    try{
         await connection
         console.log("connected to db")
         console.log("server is running at port 4400");
    }catch(err){
        console.log(err);
    }
    
})