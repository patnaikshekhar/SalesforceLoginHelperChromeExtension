module.exports = {
	entry: './assets/js/src/main.jsx',
	output: {
		path: './assets/js/dist/',
		filename: 'bundle.js'
	},
	devServer: {
		inline: true,
		port: 5050,
		publicPath: "/assets/js/dist/"
	},
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
}