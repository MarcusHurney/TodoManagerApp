module.exports = {
	entry: './public/index.js',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};