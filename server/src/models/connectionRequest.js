const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
	{
		// connection is sent from this user
		fromUserId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User', //ref to User table/schema
			require: true,
		},
		// connection is sent to this user
		toUserId: {
			type: mongoose.Schema.Types.ObjectId,
			require: true,
		},
		status: {
			type: String,
			enum: {
				values: ['ignored', 'interested', 'accepted', 'rejected'],
				message: `{VALUE} is incorrect status type`,
			},
			require: true,
		},
	},
	{
		timestamps: true,
	},
);

// Compound INDEX in ascending order (1 ascending, -1 descending)
// ConenctionRequest.find({fromUserId:5464644, toUserId:54564646})
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// pre fucntion
connectionRequestSchema.pre('save', function (next) {
	const connectionRequest = this;
	// check if the fromUsreId is same as toUserId
	if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
		throw new Error('You can not sent connection request to yourself');
	}
	next();
});

const ConnectionRequestModel = new mongoose.model(
	'connectionRequest',
	connectionRequestSchema,
);

module.exports = ConnectionRequestModel;
