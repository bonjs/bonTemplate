
/**
	author	: Alex
	email	: ske@163.com
	site	: http://bonjs.github.io
	高效率
	支持循环<each>
	支持<if>
	支持嵌套
	支持表达式
	支持自定义格式化函数
*/
var bon = function() {
	
	// 自定义标签(<if></if>, <each></each>)
	var customTagsReg     	= /(?:<if\s+.*?>(?=[^<>]*<\/?\w)|<\/if>)|<\/?each[^>]*>/g;
	
	// 获取if标签属性
	var ifAttributeReg		= /<if\s+(.*)>/g;
	
	// 获取each标签属性
	var eachAttributeReg	= /<each\s+([\w.]+)\=['"]?(\w+)['"]?(?:\s+([\w.]+)\=['"]?(\w+)['"]?)*\s*>/g;
	
	var cache = {};
	var fieldFn = {};
	
	var isIE8 = !!window && /msie 8\.0/i.test(window.navigator.userAgent.toLowerCase());
	
	var symbol = '3F2D04E0-4F8U-11D3-9A0C-0A05E82C33W1';
	
	function addThisPrefix(exp, data) {	// 全局的表达式前加this
		return exp.replace(/\b(?:(\w+)([\w.\[\]]*))\b(?!['"])/g, function(x, prefix, other) {
			return (data[prefix] !== undefined ? 'this.' : '') + prefix + other;
		});
	}

	return {
		render: function(rawHtml, data) {
			cache[rawHtml] || this.complier(rawHtml, data);
			return cache[rawHtml].call(data);
		},
		complier: function(rawHtml, data) {
			
			var html = rawHtml.replace(/\s*\n\s*/g, '');//.replace(/'/g, '\\\'');
			
			//html.split(customTagsReg) 在ie8下会把匹配出来的空字符串给吞掉，故采用此方法兼容
			var htmlTags 	= isIE8 ? html.replace(customTagsReg, symbol).split(symbol) : html.split(customTagsReg);	// html标签 
			var customTags 	= html.match(customTagsReg) || [];	// 自定义标签（<each><if>）
			
			var len = Math.max(htmlTags.length, customTags.length);
		
			var statement = '';
			for(var i = 0; i < len; i ++) {
				if(htmlTags[i]) {
					var hTag = htmlTags[i];
					
					// 如果大括号的左右标记前带有反斜线, 则忽略此标记
					// js不支持逆向环视,故改用这种方式
					hTag = hTag.replace(/([^\\]|^){(.*?[^\\])(?:\:(\w+[^\\]))?}/g, function(x, other, expression, fn) {	// 取冒号前面的表达式（如果有冒号）

						expression = addThisPrefix(expression, data);
						return other + "' + " + (fieldFn[fn] || "") + "(" + expression + ") + '";
					});
					statement += "compilerTpl += ('" + hTag + "'); \n";
				}
				if(customTags[i]) {
					var cTag = customTags[i];
					cTag = cTag.replace(eachAttributeReg, function(x, arr, item, count, index) {
					
						arr = addThisPrefix(arr, data);
					
						var id 			= 'v_' + Math.random().toString(36).slice(2, 8);
						var arrVar 		= id + '_arr';
						var itemVar		= id + '_' + item + '_it';
						var indexVar	= index || (id + '_i');
						return 	[
							'var ' + arrVar + ' = ' + arr + ';',
							count === undefined ? '' : '	var ' + count + ' = ' + arrVar + '.length;',
							'for(var ' + indexVar + ' = 0; ' + indexVar + ' < ' + arrVar + '.length; ' + indexVar + ' ++) {',
							'	var ' + item + ' = ' + arrVar + '[' + indexVar + '];'
						].join('\n');
					});
					
					cTag = cTag.replace(ifAttributeReg, function(x, ifExpression) {
						ifExpression = addThisPrefix(ifExpression, data);
						return 'if(' + ifExpression + ') {\n';
					}).replace(/<\/(?:if|each)>/g, '}\n');
					
					statement += cTag;
				}
			}
			
			var statementHeader = 'var compilerTpl = "";\n';
			var statementFooter = 'return compilerTpl;\n';
			
			cache[rawHtml] = new Function(statementHeader + statement + statementFooter);
			statement = statementHeader = statementFooter = customTags = htmlTags = null;
		},
		addFun: function(fns) {
			for(var fnName in fns) {
				fieldFn[fnName] = fns[fnName];
			}
		}
	};
}();
