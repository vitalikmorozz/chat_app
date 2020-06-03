const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = 3000 || process.env.PORT;

app.get('/', (req, res) => {
	res.send('Hello world');
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
