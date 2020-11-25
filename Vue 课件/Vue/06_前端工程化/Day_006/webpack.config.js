const path = require('path')
module.exports = {
	mode: 'development',
	// 设置入口文件路径
	entry: path.join(__dirname, './src/index.js'),
	// 设置出口文件
	output: {
		// 设置路径
		path: path.join(__dirname, './dist'),
		// 设置文件名
		filename: 'index.js',
	},
}
