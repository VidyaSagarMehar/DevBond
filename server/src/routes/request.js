const express = require('express');
const { userAuth } = require('../middleware/auth');

const requestRouter = express.Router();

requestRouter.post('/sendingConnectionRequest', userAuth, async (req, res) => {
	const user = req.user;

	console.log((user.firstName = 'sent the connection request'));
});

module.exports = requestRouter;
