module.exports = (io) => {
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
};
