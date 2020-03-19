const path = require('path');

module.exports = {
	entry: [
		'./src/main.js'
	],
	output: {
		filename: 'build.js' //comenzar con: npm run build:dev y //npm run start
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
