/**
	author	: Alex
	email	: ske@163.com
	高效率
	支持循环<each>
	支持<if>
	支持嵌套
	支持表达式
	支持自定义格式化函数
*/
var bon = function() {
	
	var customTagsReg     	= /<\/?(?:each|if)\s?(?:[^<>=\s]+\s*(?:[><=!]=?|[&|]{2})\s*[^<>=\s]+)*\s*>/g;	//	/<\/?(?:each|if)\s?[^>]*>/g;
	var ifAttributeReg    	= /<if\s+((?:[^<>=\s]+\s*(?:[><=!]=?|[&|]{2})\s*[^<>=\s]+))*\s*>/g; // 	/<if\s+([^>]+)\s*>/g;
	var eachAttributeReg   	= /<each\s+([\w.]+)\=['"]?(\w+)['"]?(?:\s+([\w.]+)\=['"]?(\w+)['"]?)*\s*>/g;
	
	var cache = {};
	
	var isIE8 = /msie 8\.0/i.test(window.navigator.userAgent.toLowerCase());

	return {
		render: function(data, rawHtml) {
			cache[rawHtml] || this.complier(rawHtml);
			return cache[rawHtml].call(data);
		},
		complier: function(rawHtml) {
			
			html = rawHtml.replace(/\s*\n\s*/g, '');
			
			var symbol = '3F2D04E0-4F8U-11D3-9A0C-0A05E82C33W1';
			//本来要直接用html.split(customTagsReg) 但在ie8下会把匹配出来的空字符串给吞掉，故采用此方法兼容
			var htmlTags 	= isIE8 ? html.replace(customTagsReg, symbol).split(symbol) : html.split(customTagsReg);	// html标签 
			var customTags 	= html.match(customTagsReg);	// 自定义标签（<each><if>）
			
			var len = Math.max(htmlTags ? htmlTags.length : 0, customTags ? customTags.length : 0);
		
			var statementHeader = 'var compilerTpl = "";\n';
			var statementFooter = 'return compilerTpl;\n';
		
			var statement = '';
			for(var i = 0; i < len; i ++) {
				if(htmlTags && htmlTags[i]) {
					var hTag = htmlTags[i];
					hTag = hTag.replace(/{(.*?)(?:\:(\w+))?}/g, function(x, expression, fn) {	// 取冒号前面的表达式（如果有冒号）
						//return expression.replace(/\b(?:([\w.]+)[\w\[\]]*)\b(?!['".])/g, function(xx, a) {	　// 取表达式中的变量（特点是后面没有引号）
						
						
							/**
								//\b(?:([\w]+)[\w\[\]]*)(?:\.\w+)?\b(?!['".])
								如果有点号，第二分组为前缀，否则为本身
								xx		a
								u.name	u
								name	name
							*/
							return ["' + ", (fn || ""), "(" , expression , ") + '"].join('');
						//});
					});
					statement += "compilerTpl += ('" + hTag + "'); \n";
				}
				if(customTags && customTags[i]) {
					var cTag = customTags[i];
					cTag = cTag.replace(eachAttributeReg, function(x, arr, item, count, index) {
						var id 			= 'v_' + Math.random().toString(36).slice(2, 8);
						var arrVar 		= id + '_arr';
						var itemVar 	= id + '_' + item + '_it';
						var indexVar 	= id + '_i';
						return 'var ' + arrVar + ' = ' + arr + '; \n' + 
						'for(var ' + indexVar + ' = 0; ' + indexVar + ' < ' + arrVar + '.length; ' + indexVar + ' ++) {\n' +
						'	var ' + item + ' = ' + arrVar + '[' + indexVar + '];\n';
						
					});
					
					cTag = cTag.replace(ifAttributeReg, function(x, ifExpression) {
					
						// 判断key前缀（如果有）或key在当前环境是否存在，如不存在，取根级的，加前缀data
						//ifExpression = ifExpression.replace(/\b(?:([\w]+)[\w\[\]]*)(?:\.\w+)?\b(?!['".])/g, function(x, a) {
						//	return '(typeof ' + a + ' == "undefined" || ' + a + ' == "" ? this.' + x + ' : ' + x + ')';
						//});
						
						return 'if(' + ifExpression + ') {\n';
					}).replace(/<\/if>/g, '}\n').replace(/<\/each>/g, '}\n');
					
					statement += cTag
				}
			}
			cache[rawHtml] = new Function(statementHeader + statement + statementFooter);
			statement = statementHeader = statementFooter = customTags = htmlTags = null;
		}
	}
}();
