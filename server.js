const express = require('express');
const io = require('socket.io');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const authRouter = require('./route/authentication');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use('/authenticate' , authRouter);
app.use('/' , '')


app.listen( PORT , () => {
    console.log('app listening on port ' , PORT)
})
