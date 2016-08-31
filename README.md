# bonTemplate
* 高效(100条数据执行10000次耗时80多ms，我本机上的测试结果，视电脑配置)
* 轻量(压缩前也才3k)
* 支持循环```<each>```
* 支持条件判断```<if>```
* 支持嵌套
* 支持表达式
* 支持自定义格式化函数

####安装和启动
```Bash
git clone https://github.com/bonjs/bonTemplate.git
npm install
node app
```

访问http://127.0.0.1:3000

####模板
```
<script id=tpl type="html">
	<div>{name}</div>
	<div>{sex}</div>
	<div>{email}</div>
</script>
```
####数据
```javascript
var data = {
	name	: 'bonTemplate',
	sex	: 'm',
	email	: 'ske@163.com'
}
```
####调用方式
```javascript
bon.complier(document.getElementById('tpl').innerHTML);
var html = bon.render(data);
a.innerHTML = html;
```


##可嵌套的循环标签
```
<each userList=u>
	<div>{u.name}</div>
	<div>{u.sex}</div>
	<div>{u.email}</div>
	<each u.hobbys=h>
		<label>{h}</label>
	</each>
</each>
```
```javascript
{
	userList: [
		{
			name	: 'bonTemplate',
			sex	: 'm',
			email	: 'ske@163.com',
			hobbys: [
				'吃',　'喝',　'玩',　'乐'
			]
		}, {
			name	: 'bonTemplate',
			sex	: 'm',
			email	: 'ske@163.com'，
			hobbys: [
				'吃',　'喝',　'玩',　'乐'
			]
		}
	]
}
```

##条件标签
```
<div>
	<div>{u.name}</div>
	<div>{u.sex}</div>
	<div>{u.email}</div>
	<if u.sex == 'm'>
		爱好数码
	</if>
</div>
```
```javascript
{
	name	: 'bonTemplate',
	sex	: 'm',
	email	: 'ske@163.com'
}
```

##表达式
```
<div>
	<div>{u.name}</div>
	<div>{u.sex == 'm' ? '男' : '女'}</div>
	<div>{u.email}</div>
</div>
```
```javascript
{
	name	: 'bonTemplate',
	sex	: 'm',
	email	: 'ske@163.com'
}
```

##自定义格式化函数
```javascript
function myFun(v) {
	return v == 'm' ? '男' : '女';	
}
```

```
<div>
	<div>{u.name}</div>
	<div>{u.sex:myFun}</div>
	<div>{u.email}</div>
</div>
```
```javascript
{
	name	: 'bonTemplate',
	sex	: 'm',
	email	: 'ske@163.com'
}
```

##全家桶
```javascript
function formateEmail(email) {
	return 'Email: ' + email;
}

```

```
<each userList=u>
	<div>{u.name}</div>
	<div>{u.sex == 'm' ? '男' : '女'}</div>
	<div>{u.email:formateEmail}</div>
	<each u.hobbys=h>
		<label>{h}</label>
	</each>
	<if u.sex == 'm'>
		爱好数码
	</if>
	<if u.sex == 'f'>
		爱好买衣服
	</if>
</each>
```
```javascript
{
	userList: [
		{
			name	: 'bonTemplate',
			sex	: 'm',
			email	: 'ske@163.com',
			hobbys: [
				'吃',　'喝',　'玩',　'乐'
			]
		}, {
			name	: 'she',
			sex	: 'f',
			email	: 'fdsafs@163.com'，
			hobbys: [
				'吃',　'喝',　'玩',　'乐'
			]
		}
	]
}
```
