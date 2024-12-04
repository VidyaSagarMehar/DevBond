const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();

app.use(express.json());

// the the user by email id
app.get('/user', async (req, res) => {
	const userEmail = req.body.emailId;
	try {
		const users = await User.find({ emailId: userEmail });
		if (users.length === 0) {
			res.status(404).send('user not found');
		} else {
			res.send(users);
		}
	} catch (err) {
		res.status(400).send('Something went wrong');
	}
});

// feed route - get all the user
app.get('/feed', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (err) {
		res.status(400).send('Something went wrong');
	}
});

app.post('/signup', async (req, res) => {
	// creating new instance of the User model
	// console.log(req.body);
	const user = new User(req.body);
	try {
		await user.save();
		res.send('User added successfully');
	} catch (err) {
		res.status(400).send('Error saving the user', err.message);
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
