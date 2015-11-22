var express = require('express');
var mongoose = require('mongoose');
var middleware = require('./config/middleware.js');
var http = require('http');

var app = express();

app.use(express.static(__dirname + '/../www'));
mongoose.connect('mongodb://localhost/legacy'); //process.env.CUSTOMCONNSTR_MONGOLAB_URI || 

middleware(app, express);

var port = process.env.PORT || 8100;



var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(port);



// Sockets
var storage = {};

io.on('connection', function (socket) {
  socket.on('init', function (data) {
    socket.join('/' + data);
    storage[data] = {};
    socket.on('userData', function (info) {
      storage[data][info.id] = info;
      socket.emit('serverData', storage[data]);
    });
    socket.on('logout', function (info) {
      delete storage[data][info];
      socket.leave('/' + data);
      socket.emit('serverData', storage[data]);
    });
  });
});

module.exports = app;
