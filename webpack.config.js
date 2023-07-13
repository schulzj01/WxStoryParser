const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const [src,dist,tests,assets] = ['src','dist','tests','assets'].map(dir => path.resolve(__dirname,dir))

module.exports = {
	entry: './src/js/WxStoryParser.js',
  output: {
    path: dist,
		filename: 'WxStoryParser.js',
    library: {
			name: 'WxStoryParser',
			type: 'umd',
			export: 'default'
		},
  },
	devServer: {
		port: 8080,
		static: src,
		hot:true, //'only',
		open: true,
		proxy: {
		'/source': {
			target: 'https://www.weather.gov/source',
			changeOrigin : true,
			pathRewrite: { '^/source': '' },
			},
			'/images': {
				target: 'https://www.weather.gov/images',
				changeOrigin : true,
				pathRewrite: { '^/images': '' },
				},
		},
	},
	plugins : [
		new HtmlWebpackPlugin({
			title: 'Wx Story Parser',
			filename: `${dist}/index.html`,
			template: `${src}/index.html`
		//	publicPath: cmsPath
		}),
	],
}
