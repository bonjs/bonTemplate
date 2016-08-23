
'use strict';
var through = require('through2');

module.exports = function (opt) {
	
	return through.obj(function (file, encoding, callback) {
	
			if (file.isNull()) {
				return callback(null, file);
			}
	
			if (file.isStream()) {
				return callback(createError(file, 'Streaming not supported'));
			}
			var str = transform(file.contents.toString());
			//console.log(str);
			file.contents = new Buffer(str);
			callback(null, file);
		}
	);
};

function transform(jsx) {
	var str = jsx.replace(/<[\s\S]*>/g, function(x) {
		return t(x);
	});
	return str;
	
	function t(str) {
		return str.replace(/^[\t ]*(?=<)/mg, function(x) {
			return x + "'";
		}).replace(/^\s*$/mg, '')	// 去空行
		.replace(/\r\n/mg, "',\n")		// 行末尾加',
		.replace(/$/g, "'");			// 末尾加'
	}
}
