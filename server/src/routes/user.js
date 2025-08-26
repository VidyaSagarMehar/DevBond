const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');

// Get all the pending connection request for the loggedIn user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
	try {
		const loggedInUser = req.user;

		const connectionRequests = await ConnectionRequest.find({
			toUserId: loggedInUser._id,
			status: 'interested',
		}).populate(
			'fromUserId',
			'firstName lastName photoUrl age about gender skills',
		);
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
		}).populate(
			'fromUserId',
			'firstName lastName photoUrl age about gender skills ',
		);

		const data = connectionRequests.map((row) => row.fromUserId);
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
module.exports = userRouter;
