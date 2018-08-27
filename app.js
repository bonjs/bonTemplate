var express = require('express');
var fs 		= require('fs');
var Mock 	= require('mockjs');
var app 	= express();

var router 	= require('./router');

doRouter(router.router);

function doRouter(r) {
	for (var k in r) {
		var data = Mock.mock(r[k]);
		(function (d) {
			app.get(k, function (req, res) {
				res.send(d);
			});
		})(data);
	}
}

app.use(express.static('./example'));

app.get('/src/index.js', function(req, res) {
	res.sendFile(__dirname + '/src/index.js')
});

var server = app.listen(3000, function (a, b) {
	var host = server.address().address;
	var port = server.address().port;

	console.log(' listening at http://%s:%s', host, port);
});

