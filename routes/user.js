const router = require('express').Router();

const UsersService = require('../service/UserService');
const { authorizedUser, hasRole } = require('../config/auth');

router.get('/list', authorizedUser, hasRole('ADMIN'), async (req, res) => {
	const users = await UsersService.find({});
	res.status(200).render('user/usersList', { users });
});

module.exports = router;
