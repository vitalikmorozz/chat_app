const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = 3000 || process.env.PORT;

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));

// Routes handle
app.get('/', (req, res) => {
	res.render('main');
});

io.on('connection', (socket) => {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', (data) => {
		console.log(data);
	});
});

server.listen(PORT, () => {
	console.log(`Server is up and listening on port ${PORT}`);
});
