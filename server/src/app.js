const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json());

// Signing up the user
app.post('/signup', async (req, res) => {
	// creating new instance of the User model
	// console.log(req.body);
	const user = new User(req.body);
	try {
		await user.save();
		res.send('User added successfully');
	} catch (err) {
		res
			.status(400)
			.send({ error: 'Error saving the user', message: err.message });
	}
});

// get the the user by email id
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

// Delete the user by ID
app.delete('/user', async (req, res) => {
	const userId = req.body.userId;
	try {
		// await User.findByIdAndDelete({_id: userId})
		// or below(Both will work same)
		await User.findOneAndDelete(userId);
		res.send('User Deleted Successfully');
	} catch (err) {
		res.status(400).send('Something went wrong');
	}
});

// Update a user by ID
app.patch('/user/:userId', async (req, res) => {
	const userId = req.params?.userId;
	const data = req.body;
	try {
		// API level data sanitization for strict checks
		const ALLOWED_UPDATES = ['photoUrl', 'about', 'gender', 'age', 'skills'];
		const isUpdateAllowed = Object.keys(data).every((k) =>
			ALLOWED_UPDATES.includes(k),
		);
		if (!isUpdateAllowed) {
			throw new Error('Updates not allowed');
		}
		if (data.length > 10) {
			throw new Error('Skills canot be more than 10');
		}
		await User.findByIdAndUpdate({ _id: userId }, data, {
			returnDocument: 'before',
			runValidators: true, //it will run the validator on schema since by default validator do not work on the PATCH/PUT
		});
		res.send('User Updated successfully');
	} catch (err) {
		res.status(400).send({ error: 'UPDATE FAILED!', message: err.message });
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
