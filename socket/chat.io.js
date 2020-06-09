module.exports = (io) => {
	const chatIO = io.of('/chat/room');
	chatIO.on('connection', (socket) => {
		let user = {};
		socket.on('user:connecting', (data) => {
			socket.join(data.roomId);
			user = data.user;
			chatIO.to(data.roomId).emit('user:connected', { user });
		});

		socket.on('msg:send', (data) => {
			socket.emit('msg:received', data);
			socket.to(data.roomId).broadcast.emit('msg:received', data);
		});

		socket.on('disconnecting', () => {
			socket.broadcast.emit('user:disconnected', { user });
		});
	});

	const lobbyIO = io.of('/chat/looby');
	lobbyIO.on('connection', (socket) => {
		socket.on('room:new', (data) => {
			const newRoom = {
				id: Math.floor(Math.random() * 10000),
				name: data.room.name,
			};
			socket.broadcast.emit('room:new', { newRoom });
		});

		socket.on('disconnecting', () => {});
	});
};
