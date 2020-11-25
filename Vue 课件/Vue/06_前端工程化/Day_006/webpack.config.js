const path = require('path') // 导入 node.js 中专门操作路径的模块
module.exports = {
	entry: path.join(__dirname, './src/index.js'), // 打包入口文件的路径
	output: {
		path: path.join(__dirname, './dist'), // 输出文件的存放路径
		filename: 'bundle.js', // 输出文件的名称
	},
}
