
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
			//do something
			//file.contents = new Buffer("哈哈"); //这里我们只是简单的改变了内容，实际上你可以你的自定义逻辑部分就在这里执行
			
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
		}).replace(/^\s*$/mg, '')		// 去空行
		.replace(/\r\n/mg, "',\n")		// 加',
		.replace(/$/g, "'");			// 加'
	}
}
