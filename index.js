var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Call up index.html
app.get('/', function(req, res){
  res.sendfile('index.html');
});

// Console logs User Connects & Disconnects
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Console logs message & number
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

// Send message to entire chat room
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//console log init
http.listen(3000, function(){
  console.log('listening on *:3000');
});