const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { userAuth } = require('../middleware/auth');

const authRouter = express.Router();

// Signing up the user
authRouter.post('/signup', async (req, res) => {
	try {
		// Validation of the data
		validateSignUpData(req);
		// Encrypt the password
		const { firstName, lastName, emailId, password } = req.body;
		const passwordHash = await bcrypt.hash(password, 10);
		// creating new instance of the User model
		const user = new User({
			firstName,
			lastName,
			emailId,
			password: passwordHash,
		});

		await user.save();
		res.json({ message: 'User Added successfully!', data: savedUser });
	} catch (err) {
		res
			.status(400)
			.send({ error: 'Error saving the user', message: err.message });
	}
});

// Login the user
authRouter.post('/login', async (req, res) => {
	try {
		const { emailId, password } = req.body;
		// check if the user is present in the DB
		const user = await User.findOne({ emailId: emailId });
		if (!user) {
			throw new Error('Invalid credentials');
		}
		// chech the password is correct or not
		const isPasswordValid = await user.validatePassword(password);
		if (isPasswordValid) {
			const token = await user.getJWT();
			console.log(token);
			// Add the token to cookie and send the response back to the user
			res.cookie('token', token);
			res.send(user);
		} else {
			throw new Error('Invalid credentials');
		}
	} catch (err) {
		res.status(400).send({ error: 'error login', message: err.message });
	}
});

// Logout the user
authRouter.post('/logout', async (req, res) => {
	try {
		res.cookie('token', null, {
			expires: new Date(Date.now()),
		});
		res.send('Logged Out successfully');
	} catch (err) {
		res.status(400).send({ error: 'error logging out', message: err.message });
	}
});
module.exports = authRouter;
