const express = require('express');
const {Server} = require('socket.io');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const authRoutes = require('./route/authentication');
const userRoutes = require('./route/user');
const bodyParser = require('body-parser');


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


    socket.on('join-room' , (roomdata) => {
        socket.join(roomdata.room_id);
        console.log('joined room :' , roomdata.room_id);
    })

    socket.on("disconnect" , (reason) => {
        console.log("user disconnected ... with socket id:" , socket.id);
    });

    socket.on('sendmessage' , (room_id , accountData , msg) => {
        io.to(room_id).emit("message" , {msg : msg , accountData : accountData})
    });
    
})


app.use(express.json());
app.use(cors());
app.use('/authenticate' , authRoutes);
app.use('/user' , userRoutes);


// app.use('/createServer' , serverRouter);


server.listen( PORT , () => {
    console.log('app listening on port' , PORT)
})

// module.exports = server ;


