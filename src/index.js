defineClass('js.User', {
	template: [
		<div>


			<li>[dfsa]{name}<button>删除</button></li>
			<li>[dfsa]{name}<button>删除</button></li>
		</div>
	],
	constructor: function() {
		$(this.el).on('click', 'button', function() {
			
		});
	}
});