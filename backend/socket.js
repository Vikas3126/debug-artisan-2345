// // index.js (Server-side)

// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const cors = require('cors');

// const PORT = 8080;
// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);
// const connectedUsers = {};

// // Allow requests from any origin
// app.use(cors());

// app.use(express.static('index.html'));

// io.on("connection",(socket)=>{
//     socket.on('join-lobby',(userName)=>{
//         connectedUsers[socket.id] = {name : userName};
//         io.emit('lobby_info', Object.values(connectedUsers));
//     })


//     socket.on('disconnect', () => {
//         if (connectedUsers[socket.id]) {
//             const userName = connectedUsers[socket.id].name;
//             delete connectedUsers[socket.id];
//             console.log(`${userName} left the lobby`);
//             io.emit('lobby_info', Object.values(connectedUsers));
//         }
//     });
// });

// server.listen(PORT, () => {
//     console.log(`Server is running at port ${PORT}`);
// });
