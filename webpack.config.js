const path = require('path');

module.exports = {
	entry: [
		'./src/main.js'
	],
	output: {
		filename: 'build.js' //npm run build:dev
	},
	module: {
		rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
		]
	}
};
