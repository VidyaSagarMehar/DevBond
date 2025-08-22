const express = require('express');
const { userAuth } = require('../middleware/auth');
const { validateEditProfileData } = require('../utils/validation');

const profileRouter = express.Router();

// Get profile of the user
profileRouter.get('/profile/view', userAuth, async (req, res) => {
	try {
		const user = req.user;
		res.send(user);
	} catch (err) {
		res
			.status(400)
			.send({ error: 'error getting the profile', message: err.message });
	}
});

// Edit the profile
profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
	try {
		if (validateEditProfileData(req)) {
			throw new Error('Invalid Edit Request');
		}
		const loggedInUser = req.user;

		Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

		await loggedInUser.save();

		res.json({
			message: `${loggedInUser.firstName}, your profile updated successfully`,
			data: loggedInUser,
		});
	} catch (err) {
		res
			.status(400)
			.send({ error: 'error editing the profile', message: err.message });
	}
});

module.exports = profileRouter;
