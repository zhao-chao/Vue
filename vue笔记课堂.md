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



# 2. v-cloak

 **插值表达式 存在  “闪动”**

**v-cloak  是自定义属性**

解决原理  ： 在<style>标签里获取  v-clock

​                       替换好值之后再显示最终的值

```html
		<style>
			/* 给自定义属性添加样式 */
			[v-cloak] {
				display: none;
			}
		</style>

	<body>
		<div id="app">
			<!-- 给标签添加自定义属性 -->
			<div v-cloak>{{user.uname}}</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			let vm = new Vue({
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

# 3.v-text  和v-html 和v-pre

```html
	<body>v-pre
		<div id="app">
			<!-- v-text 可以完全取代标签里面的内容   但是不能解析 html 标签 -->
			<div v-text="uname">111</div>

			<!-- v-html 可以完全取代标签里面的内容   可以解析 html 标签 -->
			<div v-html="message">111</div>

			<!-- 如果遇到 内部嵌套 可以用打点调用的方法-->
			<div v-html="book.number">111</div>

			<!--  v-pre 显示原始信息 跳过编译过程 -->
			<div v-pre>{{message}}</div>
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
	<!-- v-text  可以完全替代标签内部的内容  但是不能解析 html标签 -->

	<!-- v-html  可以完全替代标签内部的内容  可以解析 html标签 
                 但是  v-html 有安全隐患 
                 本网站可以用  来自第三方的数据不可以使用  -->

	<!-- 要是方法里面套的方法 可以用book.message   -->
```

# 4.v-once

 **v-once 只编译一次  显示内容后  就不具备响应式了**

```html
	<body>
		<div id="app">
			<!-- v-once 只编译一次  显示内容后  就不具备响应式了 -->
			<div v-cloak v-once>{{arr}}</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			let vm = new Vue({
				el: '#app',
				data: {
					arr: '你好啊',
				},
			})
		</script>
	</body>
```

# 5.v-model 数据双向绑定

```html
	<body>
		<div id="app">
			<!-- 在input 框里面输入 内容 会改变 下面的arr 的值 -->
			<input type="text" v-model="arr" />
			<div v-cloak>{{arr}}</div>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			let vm = new Vue({
				el: '#app',
				data: {
					arr: '',
				},
			})
		</script>
	</body>
```

# 6. v-on   @ 注册事件

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

如果事件直接绑定函数名称，那么默认会传递事件对象作为事件函数的第一个参数 

如果事件绑定函数调用，那么事件对象必须作为最后一个参数显示传递，
                    并且事件对象的名称必须是$event  

```HTML
	<body>
		<div id="app">
			<!-- 如果事件直接绑定函数名称，那么默认会传递事件对象作为事件函数的第一个参数 -->
			<button v-on:click="obj">点击</button>
			<hr />
			<!-- 2、如果事件绑定函数调用，那么事件对象必须作为最后一个参数显示传递，
                    并且事件对象的名称必须是$event  -->
			<button v-on:click="obj1(1,2,$event)">点击</button>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			let vm = new Vue({
				el: '#app',
				data: {},
				methods: {
					obj: function () {
						console.log(1)
					},
					obj1: function (a, b, event) {
						console.log(a, b)
						console.log(event.target.innerHTML)
					},
				},
			})
		</script>
	</body>

```

##鼠标事件事件修饰符

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

###.once 这是只让事件触发一次



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

## 按键修饰符

.enter 回车键

.delete 删除键



```html
.delete 删除键<body>
		<div id="app">
            <!--  .delete 删除键  -->
			用户名：<input type="text" v-model="uname" @keyup.delete="obj2" />
			<br />
			密码：
              <!--  .enter 回车键  -->
			<input type="text" v-model="password" @keyup.enter="obj"/>
			<br />
			<button @click="obj">提交</button>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			let vm = new Vue({
				el: '#app',
				data: {
					uname: '',
					password: '',
				},
				methods: {
					obj: function () {
						console.log(this.uname, this.password)
					},
					obj2: function () {
						this.uname = ''
					},
				},
			})
		</script>
	</body>
```

###自定义修饰符

```html
	<body>
		<div id="app">
			<input type="text" v-on:keyup.aaa="obj" v-model="uname" />
		</div>
		<script src="./js/vue.js"></script>
		<script>
			/*  事件绑定-自定义按键修饰符
                规则：自定义按键修饰符名字是自定义的，
                但是对应的值必须是按键对应event.keyCode值
            */
			Vue.config.keyCodes.aaa = 65
			let vm = new Vue({
				el: '#app',
				data: {
					uname: '',
				},
				methods: {
					obj: function (event) {
						console.log(event.keyCode)
					},
				},
			})
		</script>
	</body>
```

# 7.v-bind

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

## v -bind  class 样式处理

```html
		<style>
			.div {
				width: 100px;
				height: 100px;
				background-color: red;
			}
		</style>

	<body>
		<div id="app">
			<!-- div 是类名     isa自定义 是布尔值 -->
			<div v-bind:class="{ div:isa }"></div>
			<button @click="obj">切换</button>
		</div>
		<script src="./js/vue.js"></script>
		<script>
			let vm = new Vue({
				el: '#app',
				data: {
					isa: true,
				},
				methods: {
					obj: function () {
						// 取反
						this.isa = !this.isa
					},
				},
			})
		</script>
	</body>
```

