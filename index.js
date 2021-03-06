const express = require('express');
const path = require('path');
require('dotenv').config();

// app de express
const app = express();

// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');




// path publico 
const publicPath = path.resolve(__dirname, 'public'); 
app.use(express.static(publicPath));


server.listen(process.env.PORT, (error_x) => {
    if (error_x) throw new Error(error_x);

    console.log('Servidor Express: PUERTO ', process.env.PORT);
});
