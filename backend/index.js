const express = require('express');
const session = require('express-session');
const passport = require('passport');
const socketIO = require("socket.io");
const cors=require('cors');
const http = require('http');
require('dotenv').config();
const connectedUsers = {};

const {userRouter} = require("./controller/routes/manualLogin.route")
const facebookRouter = require('./controller/routes/facebook.route');
const googleRouter = require('./controller/routes/google.route');
const {newsRouter}=require("./controller/routes/news.routes")
const {connection}=require('./db');
const { carRoute } = require('./controller/routes/cars.routes');
const app = express();

const server = http.createServer(app);
const io = socketIO(server);


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

  app.use(express.json());


app.use('/users', userRouter);
app.use('/facebook', facebookRouter);

app.use('/google', googleRouter);
app.use("/news",newsRouter)
app.use("/cars",carRoute)

app.use(express.static('public'));

let connections = 0;
let userNames = [];
io.on("connection", (socket) => {

  connections++;

  socket.on('join-lobby', (userName) => {
      console.log(`${userName} connected`);
      connectedUsers[socket.id] = { name: userName };
      userNames.push(connectedUsers[socket.id].name)
      io.emit('lobby_info', Object.values(connectedUsers));
      userNames.map(user=>{
        io.emit("connections_count", { count: connections, usernames: userNames });
      })
  });

  socket.on('typing',(typedText)=>{
    socket.broadcast.emit('typing',typedText);
    console.log(typedText);
  })

  socket.on('loby-message',(userName,message)=>{
      // connectedUsers[socket.id] = {name : userName,msg:message};
      // const username= connectedUsers.name
      io.emit('lobby_msg', userName,message);
  })


  // Handle socket disconnection
  socket.on('disconnect', (userName) => {
      // Decrement connections count on disconnection
      connections--;

      // Emit updated connections count to all clients
      connectedUsers[socket.id] = { name: userName };
      const disconnectedUsername = connectedUsers[socket.id].name;
    usernames = userNames.filter(name => name !== disconnectedUsername);

    // Emit updated connections count and usernames to all clients
    io.emit("connections_count", { count: connections, usernames: usernames });

    if (connectedUsers[socket.id].name) {
      const userName = connectedUsers[socket.id].name;
      delete connectedUsers[socket.id];
      console.log(`${userName} left the lobby`);
      io.emit('lobby_info', Object.values(connectedUsers));
    }
  });
});

//       if (connectedUsers[socket.id]) {
//           const userName = connectedUsers[socket.id].name;
//           delete connectedUsers[socket.id];
//           console.log(`${userName} left the lobby`);
//           io.emit('lobby_info', connectedUsers);
//       }
//   });
// });



server.listen(PORT,async()=>{
    try{
         await connection
         console.log("connected to db")
         console.log("server is running at port 4400");
    }catch(err){
        console.log(err);
    }
    
})