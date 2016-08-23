defineClass('js.User', {
	template: [
		<div>
			<each list=it>
				<li>{it.name:formate}</li>
			</each>
		</div>
	],
	constructor: function() {
		$(this.el).on('click', 'button', function() {
			
		});
	}
});