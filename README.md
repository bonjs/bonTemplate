# bonTemplate
* 高效率
* 支持循环```<each>```
* 支持```<if>```
* 支持嵌套
* 支持表达式
* 支持自定义格式化函数

```Bash
git clone https://github.com/bonjs/bonTemplate.git
npm install
```

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


###可嵌套的循环标签
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

###条件标签
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

###条件表达式
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

###自定义格式化函数
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
