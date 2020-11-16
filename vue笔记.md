# 1.{{}}  

```html
	<body>
		<div id="app">
			名字：{{uname}} <br />
			年龄:{{age}}<br />
			<h1>{{message}}</h1>
			<br />
			{{number * 2}} <br />
			{{fles ? 'true':'假的'}}
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app', // el 是选着器
				data: {
					uname: 'zc',
					age: '18',
					message: 'woshishabi',
					number: 5,
					fles: false,
				},
			})
		</script>
		<!-- {{}} 这里可以写 简单的式子  三元表达式 -->
	</body>
{{}} 可以对标签内容插值
```

# 2.v-text  和v-html

```html
		<body>
		<div id="app">
			<!-- v-text 可以完全取代标签里面的内容   但是不能解析 html 标签 -->
			<div v-text="uname">111</div>

			<!-- v-html 可以完全取代标签里面的内容   可以解析 html 标签 -->
			<div v-html="message">111</div>

			<!-- 如果遇到 内部嵌套 可以用打点调用的方法-->
			<div v-html="book.number">111</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					book: {
						age: '18',
						number: 5,
						fles: false,
					},
					uname: 'zc',
					message: '<h1>你好啊</h1>',
				},
			})
		</script>
	</body>
// v-text  可以完全替代标签内部的内容  但是不能解析 html标签


// v-html  可以完全替代标签内部的内容  可以解析 html标签


//要是方法里面套的方法 可以用book.message  
```

# 3.v-bind

```html
	<body>
		<div id="app">
			<a v-bind:href="url">{{mz}}</a>
			<a :href="url">{{mz}}</a>
			<button :disabled="disabled">{{mz2}}</button>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					mz: '百度',
					url: 'http:baidu.com',
					mz2: '按钮',
					disabled: '', //这里只要有值就是被禁用 null  undefined false 除外
				},
			})
		</script>
	</body>
//  v-bind 可以控制标签内部的属性 比如a 标签里面的href   
//  v-bind:disabled 可以控制按钮是否被禁用 
//  v-bind:href="url"  可以简写成 :href="url" 
 
```

# 4. v-on   @ 注册事件

```html
<body>
		<div id="app">
			{{age}} <br />
			<!-- <button v-on:click="obj" :disabled="disabled">{{number}}</button> -->
                    
            // v-on 可以简写为@
			<button @click="obj" :disabled="disabled">{{number}}</button>
			<hr />
            
             // 函数里面要带参数的话  要加引号
			<button @click="say('岸益')">点击</button>  
       
			{{uname}}
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					age: 0,
					number: '点击',
					disabled: false,
					uname: '',
				},
                //专门定义方法的 属性
                
                
				methods: {
					obj: function () {
                        //这里面的this 是 Vue的实例对像
						if (this.age === 10) {                     
							this.disabled = true                   
						} else {                     
							this.age++
						}
					},
					say: function (name) {
						this.uname = '你好' + name
					},
				},
			})
		</script>
	</body>
 // v=on 里面可以写方法（函数） 或者简单的式子 
```

##事件修饰符

###.prevent  这是阻止默认事件触发

```html
<body>
		<div id="app">
			<!-- .prevent 这是阻止默认事件触发 -->
			<a href="http://baidu.com" @click.prevent="fun">百度</a>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {},
				methods: {
					fun: function () {
						alert('拉拉啊拉')
					},
				},
			})
		</script>
	</body>

```

### .once 这是只让事件触发一次

```html
	<body>
		<div id="app">
			<!-- .prevent 这是阻止默认事件触发 -->
            
            <!-- 使用.once的时候  前面必须有.prevent-->
			<a href="http://baidu.com" @click.prevent.once="fun">百度</a>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {},
				methods: {
					fun: function () {
						alert('拉拉啊拉')
					},
				},
			})
		</script>
	</body>

```

### .stop 和 .self 阻止冒泡事件发生

​       **.stop 是阻止冒泡事件发送**

​      **.self 这是阻止子元素的冒泡事件发送**

```html
<body>
		<div id="app">
			<div @click="fun" id="div">
				<!-- .stop 是阻止冒泡事件发送 -->
				<button @click.stop="btn">点我</button>
				<a href="http://baidu.com" @click.prevent.stop="btn">百度</a>
			</div>
			<hr />
			<!-- .self 这是阻止子元素的冒泡事件发送 -->
			<div @click.self="fun" id="div">
				<button @click="btn">点我</button>
				<a href="http://baidu.com" @click.prevent="btn">百度</a>
			</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {},
				methods: {
					fun: function () {
						alert('拉拉啊拉')
					},
					btn: function () {
						alert('btn')
					},
					as: function () {
						alert('我是a')
					},
				},
			})
		</script>
</body>

```

### .capture 这是事件捕获

**事件捕获就是先触发父盒子的 绑定事件**

```html
<body>
		<div id="app">
			<!-- .capture 这是 事件捕获 -->
			<div @click.capture="fun" id="div">
				<button @click="btn">点我</button>
				<a href="http://baidu.com" @click.prevent="btn">百度</a>
			</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {},
				methods: {
					fun: function () {
						alert('拉拉啊拉')
					},
					btn: function () {
						alert('btn')
					},
					as: function () {
						alert('我是a')
					},
				},
			})
		</script>
	</body>
```



# 5.条件渲染

## v-if 判断语句

```html
<body>
		<div id="app">
			请输入年龄：
			<input type="text" v-model="age" /> <br />

			<!-- if 用来判断  如果里面 有内容  就会显示-->
			<div v-if="age">{{age}}</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					age: '',
				},
			})
		</script>
</body>
```

## v-if  和  v-else-if   

**v-else-if的 前面必须要有 v-if**

```html
	<body>
		<div id="app">
			请输入年龄：
			<input type="text" v-model="age" /> <br />

			<!-- if 用来判断  如果if 成立 就会显示-->
			<!-- parseInt() 这个是转为整数  如果输入的不是 数字 就会是NAN 就不会进入到里面去 -->
			<div v-if="parseInt(age)">
				你的年龄是 :{{age}}
				<div v-if="age < 19 ">回去写作业</div>

				<div v-else-if=" age < 30 ">可以结婚拉</div>

				<div v-else-if=" age > 30">可以去死了</div>
				<div v-else>输入错误</div>
			</div>
			<div v-else-if="age !== ''">输入错误</div>
			<!-- 判断年龄分区 -->
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					age: '',
				},
			})
		</script>
	</body>
```

## v-if  和 v-show

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好

```html
	<body>
		<div id="app">
			请输入年龄：
			<input type="text" v-model="age" /> <br />
			<!--  原本是渲染在了页面上 只是影藏了起来
                只有 v-show  条件满足时才能显示  
            不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。
            v-show 只是简单地切换元素的 CSS property display。
            -->
			<div v-show="age>=18">成年人</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					age: '',
				},
			})
		</script>
	</body>
```

# 6. 列表渲染  循环

## v-for

### **数值型**

```html

<body>
		<div id="app">
			<!-- v-for 这里可以循环 <span> 标签  后面的10表示循环多少次
               从1开始

                循环次数必须是整数
             -->
			<span v-for="arr in 10"> {{arr}} </span>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					age: '',
				},
			})
		</script>
	</body>
```

### 字符串

```html
	<body>
		<div id="app">
			<!-- v-for 还可以循环 字符串类型的-->
			<span v-for="arr in 'asdfhjxkjs'"> {{arr}} </span>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					age: '',
				},
			})
		</script>
	</body>
```

### 数组

```html
<body>
		<div id="app">
			<!-- v-for 还可以循环 数组-->
			<!-- 数组可以写到 v-for 里面也可以写到  script 里面  -->
			<span v-for="arr in ['asd','asd','5564','sadq']"> {{arr}} </span>
			<hr />

			<span v-for="arr in age"> {{arr}} </span>

			<!-- 循环ul 里面的  li -->
			<ul>
				<li v-for="arr in str">{{arr}}</li>
			</ul>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					age: ['qqq', 'www', 'liaaa', 'ppp'],
					str: ['q', 'w', 'o', 'h'],
				},
			})
		</script>
	</body>

```

### 对像

```html
	<body>
		<div id="app">
			<!-- 这是循环对像里面的值 -->
			<ul>
				<li v-for="arr in user">{{arr}}</li>
			</ul>
			<!-- 要是数组里面包的又对像  可以用双重循环 -->
			<div v-for="arr in user1">
				<div v-for="str in arr">{{str}}</div>
			</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					user: {
						uname: 'zs',
						age: 18,
						mobile: '1323232322',
					},
					user1: [
						{
							uname: 'zs',
							age: 1,
							mobile: '1111111',
						},
						{
							uname: 'li',
							age: 2,
							mobile: '2222222',
						},
						{
							uname: 'ww',
							age: 3,
							mobile: '3333333',
						},
					],
				},
			})
		</script>
	</body>
```

### v-for  数组索引

**在遍历数组的时候 里面可以传两个值  第二个值是 索引  
                 在循环的时候 也可以插入外部的属性**

```php+HTML
<body>
		<div id="app">
			<!-- 在遍历数组的时候 里面可以传两个值  第二个值是 索引  
                 在循环的时候 也可以插入外部的属性
            -->
			<div v-for="(str,i) in arr">{{num}} - {{i}}: {{str}}</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					num: '字母',
					arr: ['a', 'b', 'c'],
				},
			})
		</script>
</body>
```

###v-for  对像索引

**在遍历对像的时候:** 

 **(value) 第一个值是 属性的值**   

**(name) 第二个值是 属性的名字**

**(i)  第二个值是 索引**

```html
<body>
		<div id="app">
			<!-- 在遍历对像的时候 
               (value) 第一个值是 属性的值   
               (name) 第二个值是 属性的名字
               (i)  第二个值是 索引
            -->
			<div v-for="(value,name,i) in user">
				{{i}} - {{name}} - {{value}}
			</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			new Vue({
				el: '#app',
				data: {
					user: {
						uname: 'zs',
						age: 18,
						mobile: '1323232322',
					},
				},
			})
		</script>
	</body>
```

