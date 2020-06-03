const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');

const PORT = 3000 || process.env.PORT;

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Routes handle
app.use('/chat', require('./routes/chatRouter'));

app.get('/', (req, res) => {
	res.render('main');
});

io.on('connection', (socket) => {
	console.log('Connected');
	socket.on('msg:send', (data) => {
		console.log(data);

		socket.emit('msg:received', data);
		socket.broadcast.emit('msg:received', data);
	});

	socket.on('disconnect', () => {
		console.log('Disconnected');
	});
});

server.listen(PORT, () => {
	console.log(`Server is up and listening on port ${PORT}`);
});
