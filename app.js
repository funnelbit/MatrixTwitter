
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , socketio = require("socket.io")
  , twitter = require('ntwitter')
  , path = require('path');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

//IO
var io = socketio.listen(http.createServer(app).listen(app.get('port')),function() {
        console.log("つながった");
    });

var twitter = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

io.sockets.on('connection', function (socket) {

    socket.emit('new', { hello: 'world' });

    socket.on('message', function (data) {

        console.log(data);
        socket.emit('message',data);
        socket.broadcast.emit('message',data);


    });

    twitter.stream('statuses/sample', function(stream) { //こっちのほうがいっぱい流れて面白い
    //twitter.stream('user', {track:'nodejs'},function(stream) { //自分のTLとるときはこっち
        stream.on('data', function (data) {

            if(data.text != undefined) {

                socket.emit('message',{text:data.text});
                socket.broadcast.emit('message',{text:data.text});

                console.log(data.text);

            }else{

                console.log(data.text);

            }

        });
        stream.on('end', function (response) {
            // 切断された場合の処理
            console.log("end");
            console.log(response);

        });
        stream.on('destroy', function (response) {
            // 接続が破棄された場合の処理
            console.log('destroy');
            console.log(response);

        });

    });

});
