# mytest

转换前
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


转换后
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