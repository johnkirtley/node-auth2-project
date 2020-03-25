const express = require('express');
const cors = require('cors');

const userRouter = require('../users/user_router');
const authRouter = require('../auth/auth_router');
const restricted = require('../auth/restricted');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, userRouter);

server.get('/', (req, res) => {
	res.status(201).json({ message: 'API RUNNING' });
});

module.exports = server;

// function checkDepartment(role) {
// 	return (req, res, next) => {
// 		if (req.decodedToken && req.decodedToken.department === role) {
// 			next();
// 		} else {
// 			res.status(403).json({ message: 'Unauthorized' });
// 		}
// 	};
// }
