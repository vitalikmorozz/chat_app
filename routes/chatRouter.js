const router = require('express').Router();

router.route('/').get((req, res) => {
	res.render('chat/main');
});

module.exports = router;
