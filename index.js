var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usr = 0;
var usrId = 0;

// Call up index.html
app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});
// Console logs User Connects & Disconnects
io.on('connection', function(socket){
  usr++;
  usrId++;
    console.log('user(' + usrId + ') connected    |     :users: ' + usr);
    socket.on('connection', function(usr){
      io.emit('user connected', usr);
    });
    socket.on('disconnect', function(){ 
      usr--;
      console.log('user(' + usrId + ') disconnected |     :users: ' + usr);
    });
  });

// Console logs message & number
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('                     |   :message: ' + msg);
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
  console.log('listening            | :localhost: 3000');
});
