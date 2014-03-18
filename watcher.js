fs = require('fs')
dir = "/home/erogers/Projects/livereload/";
//only show non-hidden files
HIDDEN_FILES = /^[\.]\w+/;
fs.watch(dir, {}, function(event, filename){
	console.log(event);
	if(!HIDDEN_FILES.test(filename)) {
		console.log(filename);
	}
})