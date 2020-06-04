module.exports = (io) => {
	io.on('connection', (socket) => {
		let user = {};
		socket.on('user:connecting', (data) => {
			user = data.user;
			console.log(`New user ${user.username} connected`);
			io.emit('user:connected', { user });
		});

		socket.on('msg:send', (data) => {
			socket.emit('msg:received', data);
			socket.broadcast.emit('msg:received', data);
		});

		socket.on('disconnecting', () => {
			console.log(`${user.username} disconnected`);
			socket.broadcast.emit('user:disconnected', { user });
		});
	});
};
