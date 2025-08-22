const express = require('express');
const { userAuth } = require('../middleware/auth');

const profileRouter = express.Router();

// Get profile of the user
profileRouter.get('/profile', userAuth, async (req, res) => {
	try {
		const user = req.user;
		res.send(user);
	} catch (err) {
		res.status(400).send({ error: 'error login', message: err.message });
	}
});

module.exports = profileRouter;
