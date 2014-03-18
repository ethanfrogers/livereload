var fs = require('fs');
var app = require('http').createServer(function(){});
var io = require('socket.io').listen(app, {log: false});

var config = {
	"server_port" : "8080",
	"watched_directories" : ['/var/www/'],
};
app.listen(config.server_port || 8080); //listen for requests on port
io.sockets.on('connection', function (socket) {
	//setup a file watch for each directory or file the config defines as watched
	for (var i = config.watched_directories.length - 1; i >= 0; i--) {
		fs.watch(config.watched_directories[i], function(event, filename){
			if(!/^[\.]\w+/.test(filename)){
				socket.emit('file-change');
			}		
		});
	}

});
