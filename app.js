var express = require('express');
var Mock 	= require('mockjs');
var app 	= express();


app.use(express.static('./'));

app.get('/test', function (req, res) {
	res.sendfile('./t4.html');
});

var server = app.listen(3000, function (a, b) {
	var host = server.address().address;
	var port = server.address().port;

	console.log(' listening at http://%s:%s', host, port);
});

