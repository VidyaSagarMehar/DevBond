const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const USER_SAFE_DATA =
	'firstName lastName photoUrl age gender about skills role location github linkedin website';

// Get all the pending connection request for the loggedIn user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
	try {
		const loggedInUser = req.user;

		const connectionRequests = await ConnectionRequest.find({
			toUserId: loggedInUser._id,
			status: 'interested',
		}).populate('fromUserId', USER_SAFE_DATA);
		// }).populate('fromUserId', ['firstName', 'lastName']);

		res.json({
			message: 'data fetched successfullly',
			data: connectionRequests,
		});
	} catch (err) {
		res.status(400).send({
			error: 'error getting the data',
			message: err.message,
		});
	}
});

// Get all the accepted connection request for the loggedIn user
userRouter.get('/user/connections', userAuth, async (req, res) => {
	try {
		const loggedInUser = req.user;

		const connectionRequests = await ConnectionRequest.find({
			$or: [
				{ toUserId: loggedInUser._id, status: 'accepted' },
				{ fromUserId: loggedInUser._id, status: 'accepted' },
			],
		})
			.populate('fromUserId', USER_SAFE_DATA)
			.populate('toUserId', USER_SAFE_DATA);

		const data = connectionRequests.map((row) => {
			if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
				return row.toUserId;
			}
			return row.fromUserId;
		});
		res.json({
			data,
		});
	} catch (err) {
		res.status(400).send({
			error: 'error getting the data',
			message: err.message,
		});
	}
});

// Get all the available users
userRouter.get('/feed', userAuth, async (req, res) => {
	try {
		// User should see all the user cards except
		// 1. His own card 2. his connections, 3. Ignored people 4. Already sent the connection

		const loggedInUser = req.user;

		const page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		limit = limit > 50 ? 50 : limit; //setting max limit to 50
		const skip = (page - 1) * limit;

		// Find all connection request (sent + received)
		const connectionRequests = await ConnectionRequest.find({
			$or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
		}).select('fromUserId toUserId');

		const hideUsersFromFeed = new Set();
		connectionRequests.forEach((req) => {
			hideUsersFromFeed.add(req.fromUserId.toString());
			hideUsersFromFeed.add(req.toUserId.toString());
		});
		console.log(hideUsersFromFeed);

		// find all the user who are not in the array and the logged in user also should not be there
		const users = await User.find({
			$and: [
				{ _id: { $nin: Array.from(hideUsersFromFeed) } },
				{ _id: { $ne: loggedInUser._id } },
			],
		})
			.select(USER_SAFE_DATA)
			.skip(skip)
			.limit(limit);

		res.json({ data: users });
	} catch (err) {
		res.status(400).send({
			error: 'error getting the data',
			message: err.message,
		});
	}
});

module.exports = userRouter;
