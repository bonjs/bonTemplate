## bonTemplate
* 标签化
* 高效率
* 支持循环```<each>```
* 支持```<if>```
* 支持嵌套
* 支持表达式
* 支持自定义格式化函数

#转换前
```javascript
defineClass('js.User', {
	template: (
		<div>
			<li>{name}<button>删除</button></li>
		</div>
	),
	constructor: function() {
		$(this.el).on('click', 'button', function() {
			
		});
	}
});
```

#转换后
```javascript
defineClass('js.User', {
	template: [
		'<div>',
			'<li>{name}<button>删除</button></li>',
		'</div>'
	],
	constructor: function() {
		$(this.el).on('click', 'button', function() {
			
		});
	}
});
```
