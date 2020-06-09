const router = require('express').Router();

const { authorizedUser } = require('../config/auth');

let rooms = [
	{ id: '1234', name: 'MyRoom' },
	{ id: '3211', name: 'MySecondRoom' },
	{ id: '5436', name: 'MyThirdRoom' },
];

router.route('/lobby').get(authorizedUser, (req, res) => {
	res.render('chat/lobby', { rooms });
});

router.route('/room/:room').get(authorizedUser, (req, res) => {
	const room = rooms.find((room) => room.id == req.params.room);
	res.render('chat/room', { room });
});

router.route('/room/new').post(authorizedUser, (req, res) => {});

module.exports = router;
