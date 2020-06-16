require('dotenv');

const server = require('./api/server');

const port = process.env.PORT || 5500;
server.listen(port, () => {
	console.log(`=== Running on port ${port} ===`);
});
