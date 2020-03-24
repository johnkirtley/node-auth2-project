const router = require('express').Router();
const Users = require('./model');

router.get('/', (req, res) => {
	Users.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.status(404).json({ message: 'No users founds' });
		});
});

module.exports = router;
