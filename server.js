var express = require('express');

var app = express(); 
var server = app.listen(3000)

app.use(express.static('public'))

var socket = require('socket.io')

var io = socket(server)

io.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);
    socket.on('face',(data) => {
        socket.broadcast.emit('face',data);
        //io.sockets.emit('face',data)
        console.log("connected Face",data)
        console.log(data)
    });
});