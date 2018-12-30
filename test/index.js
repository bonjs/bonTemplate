
var bon = require("../");
var assert  = require("assert");




describe('test index.js', function() {

	var template = `
		<div>城市名称:{name}</div>
		<div>国家:{country}</div>
		<div>奥运会时间:{olympicsTime:formateTime}</div>
		<div>位置:{position.longitude + " " + position.latitude}</div>
		<div>其他:{other.otherNames:formateOtherName}</div>
		<div>人口:{population}万</div>
		<if population >= 1000>
			人口大城市	
		</if>
		<each area=u count=i>
			<div class=title2>{u.name} - {i}</div>
		</each>
	`;

	var data = {
		name: '北京',
		country: '中国',
		olympicsTime:'20080808',
		area: [
			{name: '海淀区'}, 
			{name: '朝阳区'}	
		],
		population: '2152.00',
		position: {
			longitude : '116.46',
			latitude:'39.92',
		},
		other: {
			otherNames: ['北平','帝都'],
		}
	}
	
	bon.addFun({
		formateTime: function(v) {
			var matches = /(\d{4})(\d{2})(\d{2})/.exec(v);
			return matches[1] + '年' + matches[2] + '月' + matches[3] + '日';
		},
		formateOtherName: function(a) {
			return a.join(',');
		}
	});
	
	var output = bon.render(template, data);

	console.log(output);


	var info = `
	output should equals 
	${template}
	`
    it(info, function() {
       if(false) {
         throw new Error("the ouput is not what we expacted !");
       }
    });
});

