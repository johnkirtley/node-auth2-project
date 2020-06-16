const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/model');
const { jwtSecret } = require('../config/secrets');

router.post('/register', (req, res) => {
	const info = req.body;
	const rounds = process.env.HASHING_ROUNDS || 10;
	const hash = bcrypt.hashSync(info.password, rounds);

	info.password = hash;

	Users.add(info)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			console.log('Error adding user', err);
		});
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	Users.findBy({ username })
		.then(([user]) => {
			console.log('user', user);
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);

				res.status(201).json({ message: 'Logged In', token });
			} else {
				res.status(401).json({ message: 'Error logging in' });
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/logout', (req, res) => {
	if (req.session) {
		res.session.destroy();
	} else {
		res.status(200).json({ message: 'Already logged out' });
	}
});

// Generate Token Function

function generateToken(user) {
	const payload = {
		username: user.username,
		role: user.role || 'user',
		department: user.department,
	};

	const options = {
		expiresIn: '1h',
	};

	return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
