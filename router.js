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
		'departList|5' : [{
				departName : /\w{5}\d{1,2}/,
				leaderName: /\w{5}/,
				'group|2': [
					{
						groupName: /\w{5}/,
						'userList|3': [
							{name: /\w{5,7}/, sex:/[mf]/}
						]
					}
				]
			}
		]
	}
};
exports.router = router;

