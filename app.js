var express = require('express');
var Mock 	= require('mockjs');
var app 	= express();


app.use(express.static('./publish'));

app.get('/test', function (req, res) {
	res.sendfile('./t3.html');
});

var server = app.listen(3000, function (a, b) {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

