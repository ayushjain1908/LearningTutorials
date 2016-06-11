var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(8000);

io.on('connection' , function(socket){
  // var alert = 'hello from server :)' + Math.random();
  // //
  // socket.emit('hello',alert);
  // socket.on('hello',function(data){
  //   console.log(data);
  // })
  socket.on('color',function() {
     socket.broadcast.emit('color','yellow');
   });
  socket.on('disconnect',function(){
    console.log('1 client disconnected');
  })
})
