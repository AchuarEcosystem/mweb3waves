const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
	res.sendFile('index.html', { root : __dirname});
});

// routes
app.use(require('./src/routes/index'));
app.use('/api/datosbch', require('./src/routes/datosbch')); //30-03-2020
app.use('/api/projects', require('./src/routes/projects'));
app.use('/api/users', require('./src/routes/users'));

//settings
app.listen(process.env.PORT || 3000, () => {
	console.log(__dirname);
	console.log("Listening Port 3000");
});