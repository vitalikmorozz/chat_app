const router = require('express').Router();

const { authorizedUser } = require('../config/auth');

router.route('/').get(authorizedUser, (req, res) => {
	res.render('chat/main');
});

module.exports = router;
