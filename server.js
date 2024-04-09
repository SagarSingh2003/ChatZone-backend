const express = require('express');
const {Server} = require('socket.io');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const authRoutes = require('./route/authentication');
const userRoutes = require('./route/user');
const bodyParser = require('body-parser');
const messageRoutes = require('./route/message');
const { sensitiveHeaders } = require('http2');

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

const io = new Server( {
    cors: {
        origin: "*"
    }
});


io.attach(server);



io.on('connection',(socket) => {
    console.log("user connected..... with socket id :  " ,socket.id );

    // let currentServerId ;
    // socket.on("join-server" , (serverdata) => {
    //     socket.join(serverdata.server_id);
    //     currentServerId = serverdata.server_id;
    //     console.log("serverjoined");
    // })

    // socket.on('leave-server' , () => {
    //     console.log("left server" , currentServerId);
    //     socket.leave(currentServerId)
    // })

    // socket.on('notification' , (data) => {
    //     console.log('sent notification');
    //     console.log(data.server_id , "idd server id ");
    //     io.to(data.server_id).emit("notification", {room_id : data.room_id});
    // })

    socket.on('join-room' , (roomdata) => {
        socket.join(roomdata.room_id);
        console.log('joined room :' , roomdata.room_id);
    })

    socket.on("disconnect" , (reason) => {
        console.log("user disconnected ... with socket id:" , socket.id);
    });

    socket.on('leave-room', (room_id) => {
        console.log('left room' , room_id);
        socket.leave(room_id);
    });

    socket.on('sendmessage' , (room_id , accountData , msg) => {
        console.log(msg);
        io.to(room_id).emit("message" , {msg : msg , accountData : accountData , room_id : room_id} , (data) => {
            console.log("message emitted");
            console.log(room_id);
        });
    });

    socket.on('typingStart' , (room_id , accountData ) => {
        console.log('started typing' , accountData[0].username)
        io.to(room_id).emit('typing-start' , { accountData : accountData , room_id : room_id});
    })

    socket.on('typingStop' , (room_id , accountData) => {
        console.log('stopped typing...' , accountData[0].username);
        io.to(room_id).emit('typing-stop' , {accountData : accountData , room_id : room_id});
    })
    
})


app.use(express.json());
app.use(cors());
app.use('/authenticate' , authRoutes);
app.use('/user' , userRoutes);
app.use('/messages' , messageRoutes);

// app.use('/createServer' , serverRouter);


server.listen( PORT , () => {
    console.log('app listening on port' , PORT)
})

// module.exports = server ;


