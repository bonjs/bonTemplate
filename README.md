# bonTemplate
* 高效率
* 支持循环```<each>```
* 支持```<if>```
* 支持嵌套
* 支持表达式
* 支持自定义格式化函数



####模板
```
<script id=tpl type="html">
	<div>{name}</div>
	<div>{sex}</div>
	<div>{email}</div>
</script>
```
####数据
```
var data = {
	name: 'bonTemplate',
	sex: 'm',
	email: 'ske@163.com'
}
```
####javascript
```
bon.complier(document.getElementById('tpl').innerHTML);
var html = bon.render(data);
a.innerHTML = html;
```
