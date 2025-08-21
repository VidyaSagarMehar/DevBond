const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { userAuth } = require('./middleware/auth');

app.use(express.json());
app.use(cookieParser());

// Signing up the user
app.post('/signup', async (req, res) => {
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
		res.send('User added successfully');
	} catch (err) {
		res
			.status(400)
			.send({ error: 'Error saving the user', message: err.message });
	}
});

// Login the user
app.post('/login', async (req, res) => {
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
			res.send('User Login successfulyl');
		} else {
			throw new Error('Password is not correct');
		}
	} catch (err) {
		res.status(400).send({ error: 'error login', message: err.message });
	}
});

// Get profile of the user
app.get('/profile', userAuth, async (req, res) => {
	try {
		const user = req.user;
		res.send(user);
	} catch (err) {
		res.status(400).send({ error: 'error login', message: err.message });
	}
});

connectDB()
	.then(() => {
		console.log('Database Connected sucessfully');
		app.listen(7777, () => {
			console.log('Server is successfully listining on port 7777');
		});
	})
	.catch((err) => {
		console.log(err);
		console.error('Data cannot be connected');
	});
