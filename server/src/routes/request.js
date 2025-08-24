const express = require('express');
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const requestRouter = express.Router();

// Send connection request route
requestRouter.post(
	'/request/send/:status/:toUserId',
	userAuth,
	async (req, res) => {
		try {
			const fromUserId = req.user._id;
			const toUserId = req.params.toUserId;
			const status = req.params.status;

			const allowedStatus = ['ignored', 'interested'];
			if (!allowedStatus.includes(status)) {
				return res.status(400).json({
					message: 'Invalid status type ' + status,
				});
			}

			// Checking if the 'to user' is present or not in our DB
			const toUser = await User.findById(toUserId);
			if (!toUser) {
				return res.status(404).json({
					message: 'User not found',
				});
			}

			// Checking If there is an existing ConnectionRequest
			const existingConnectionRequest = await ConnectionRequest.findOne({
				$or: [
					{ fromUserId, toUserId },
					{ fromUserId: toUserId, toUserId: fromUserId },
				],
			});
			if (existingConnectionRequest) {
				return res
					.status(400)
					.send({ message: 'Connection request already exists' });
			}

			const connectionRequest = new ConnectionRequest({
				fromUserId,
				toUserId,
				status,
			});

			const data = await connectionRequest.save();
			res.json({
				message:
					req.user.firstName + ' is ' + status + ' to ' + toUser.firstName,
				data,
			});
		} catch (err) {
			res
				.status(400)
				.send({ error: 'error sending the request', message: err.message });
		}
	},
);

module.exports = requestRouter;
