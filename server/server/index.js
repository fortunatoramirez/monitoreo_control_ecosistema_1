var express = require('express');
var app = express();
var server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

ArduinoSocketID = null;
io.on('connection', function(socket){

    socket.on('soy_arduino',function(data){
        ArduinoSocketID = socket.id;
        //console.log(ArduinoSocketID);
    });
    socket.on('arduino',function(data){
        console.log(data);
        io.sockets.emit('arduino',data);
    });
    socket.on('comando',function(data){
        console.log(data);
        socket.broadcast.to(ArduinoSocketID).emit('comando',data);
    });
});

server.listen(5001, function(){
    console.log("Servidor corriendo en el puerto 5001.")
});
