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
	var customTagsReg		= /<\/?(?:each|if)\s?[^>]*>/g;
	var eachAttributeReg 	= /<each\s+([\w.]+)\=['"]?(\w+)['"]?(?:\s+([\w.]+)\=['"]?(\w+)['"]?)*\s*>/g;
	var ifAttributeReg 		= /<if\s+([^>]+)\s*>/g;
	
	var isES5 = !!Object.defineProperty;
	var cache = {};
	
	return {
		render: function(data, rawHtml) {
			if(cache[rawHtml]) {
				return cache[rawHtml].call(this, data);
			}
			this.complier(rawHtml);			
			return cache[rawHtml].call(this, data);
		},
		complier: function(rawHtml) {
			
			html = rawHtml.replace(/\s*\n\s*/g, '');
			var htmlTags 	= html.split(customTagsReg);	// html标签
			var customTags 	= html.match(customTagsReg);	// 自定义标签（<each><if>）
			
			var len = Math.max(htmlTags ? htmlTags.length : 0, customTags ? customTags.length : 0);
		
			var statementHeader = 'var compilerTpl = ' + (isES5 ? '""' : '[]') + ';\n';
			var statementFooter = 'return ' + (isES5 ? 'compilerTpl; \n' : 'compilerTpl.join("");\n');
		
			var statement = isES5 ? '' : [];
			for(var i = 0; i < len; i ++) {
				if(htmlTags && htmlTags[i]) {
					var hTag = htmlTags[i];
					
					hTag = hTag.replace(/{(.*?)(?:\:(\w+))?}/g, function(x, k, fn) {
						if(/\./.test(k)) {		// 如果有.标点，直接取值
							return ["' + ", (fn || ""), "(" , k , ") + '"].join('');
						}
						
						// 如果没有.符号，判断key前缀（如果有）或key在当前环境是否存在，如不存在，取根级的，加前缀data
						return ["' + ", (fn || ""), "(typeof ", k, " == \"undefined\" || ", k, " == \"\" ? rootData.", k, " : ", k, ") + '"].join('');
					});
					isES5 ? statement += "compilerTpl += ('" + hTag + "'); \n" : statement.push("compilerTpl.push('" + hTag + "'); \n");
				}
				if(customTags && customTags[i]) {
					var cTag = customTags[i];
					cTag = cTag.replace(eachAttributeReg, function(x, arrVar, itemVar, countVar, indexVar) {
						return 'var arr = typeof ' + arrVar + ' == "undefined" ? rootData.' + arrVar + ' : ' + arrVar + '; \narr.forEach(function(' + itemVar + ', ' + indexVar + ') { \n';
					});
					
					cTag = cTag.replace(ifAttributeReg, function(x, ifExpression) {
					
						// 判断key前缀（如果有）或key在当前环境是否存在，如不存在，取根级的，加前缀data
						ifExpression = ifExpression.replace(/\b(?:([\w]+)[\w\[\]]*)(?:\.\w+)?\b(?!['".])/g, function(x, a) {
							return '(typeof ' + a + ' == "undefined" || ' + a + ' == "" ? rootData.' + x + ' : ' + x + ')';
						});
						
						return 'if(' + ifExpression + ') {\n';
					}).replace(/<\/if>/g, '}\n').replace(/<\/each>/g, '});\n');
					
					isES5 ? statement += cTag : statement.push(cTag);
				}
			}
			statement = isES5 ? statement : statement.join('');
			cache[rawHtml] = new Function('rootData', statementHeader + statement + statementFooter);
			statement = statementHeader = statementFooter = customTags = htmlTags = null;
		}
	}
}();
