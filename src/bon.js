
/**
	
*/
var bon = function() {
	
	var customTagsReg		= /<\/?each\s?[^>]*>|<\/?if\s?[^>]*>/g;
	var eachAttributeReg 	= /<each\s+([\w.]+)\=['"]?(\w+)['"]?(?:\s+([\w.]+)\=['"]?(\w+)['"]?)*\s*>/g;
	var ifAttributeReg 		= /<if\s+([^>]+)\s*>/g;
	
	var isES5 = !!Object.defineProperty;
	return {
		render: function(rootData, html) {
			html && this.complier(html);
		
			var tpl = this.template;
		
			//eval('var compilerTpl = []; with(data) { ' + tpl + '}');
			
			var compilerTpl = isES5 ? '' : []; 
			eval(tpl);
			
			var result = isES5 ? compilerTpl : compilerTpl.join('');
			compilerTpl = null;
			return result;
		},
		complier: function(html) {
			html = html.replace(/\s*\n\s*/g, '');
			var htmlTags 	= html.split(customTagsReg);	// html标签
			var customTags 	= html.match(customTagsReg);	// 自定义标签（<each><if>）
			
			var len = Math.max(htmlTags.length, customTags.length);
		
			var statement = isES5 ? '' : [];
			for(var i = 0; i < len; i ++) {
				if(htmlTags[i]) {
					var hTag = htmlTags[i];
					hTag = hTag.replace(/{([^}]+)}/g, function(x, k) {
						if(/\./.test(k)) {
							return ["' + (" , k , ") + '"].join('');
						}
						return ["' + (typeof " , k , " == \"undefined\" ? rootData." , k , " : " , k , ") + '"].join('');
					});
					isES5 ? statement += "compilerTpl += ('" + hTag + "'); \n" : statement.push("compilerTpl.push('" + hTag + "'); \n");
				}
				if(customTags[i]) {
					var cTag = customTags[i];
					cTag = cTag.replace(eachAttributeReg, function(x, arrVar, itemVar, countVar, indexVar) {
						return 'var d = typeof ' + arrVar + ' == "undefined" ? rootData.' + arrVar + ' : ' + arrVar + '; d.forEach(function(' + itemVar + ', ' + indexVar + ') { \n';
					});
					
					cTag = cTag.replace(ifAttributeReg, function(x, ifExpression) {
					
						// 判断key前缀（如果有）或key在当前环境是否存在，如不存在，取根级的，加前缀data
						ifExpression = ifExpression.replace(/\b(?:([\w]+)[\w\[\]]*)(?:\.\w+)?\b(?!['".])/g, function(x, a, b) {
							return '(typeof ' + a + ' == "undefined" || ' + a + ' == "" ? rootData.' + x + ' : ' + x + ')';
						});
						
						return 'if(' + ifExpression + ') { \n';
						//return 'if(' + v1 + ' == "' + v2 + '") { \n';
					}).replace(/<\/if>/g, ' } \n ').replace(/<\/each>/g, ' }); \n');
					
					isES5 ? statement += cTag : statement.push(cTag);
				}
			}
			this.template = isES5 ? statement : statement.join('');
			statement = customTags = htmlTags = null;
		}
	}
}();