var router = {
	'/': 'hello world',
	'/admin': {
	    'list|1-10': [{
	        'id|+1': 1
	    }]
	},
	'/userList': {
	    'userList|10': [{
	       'id': /\w{32}/,
        	'name': /[a-z]{3,6}/
	    }]
	},
	'/user': {
		'id': /\w{32}/,
        'name': /[a-z]{3,6}/
	},
	'/getData': {
		title : 'ckk',
		'departList|2' : [{
				departName : /[A-Z][a-z]{1,6}/,
				leaderName: /([A-Z][a-z]{1,6} ){2}/,
				'group|2': [
					{
						groupName: /[A-Z][a-z]{1,6}/,
						'userList|2': [
							{name: /([A-Z][a-z]{1,6} ){2}/, sex:/[mf]/,
								'list|2': [
									{name: /\w{5}/,
										'list|2': [
											{name: /\w{5}/,  
												'list|2': [
													{name: /\w{5}/,
														'list|2': [
															{name: /\w{5}/,
																'list|2': [
																	{name: /\w{5}/}
																]
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
		]
	}
};
exports.router = router;

