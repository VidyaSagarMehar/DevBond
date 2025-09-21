const cron = require('node-cron');
const { endOfDay, startOfDay, subDays } = require('date-fns');
const sendEmail = require('./sendEmail');
const ConnectionRequestModel = require('../models/connectionRequest');

cron.schedule('0 8 * * *', async () => {
	// Send email to all people who got request the previous day
	try {
		const yesterday = subDays(new Date(), 1); //one day back

		const yesterdayStart = startOfDay(yesterday);
		const yesterdayEnd = endOfDay(yesterday);

		const pendingRequests = await ConnectionRequestModel.find({
			status: 'interested',
			createdAt: {
				$gte: yesterdayStart,
				$lt: yesterdayEnd,
			},
		}).populate('fromUserId toUserId');

		const listOfEmails = [
			...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
		];

		console.log(listOfEmails);

		for (const email of listOfEmails) {
			// send emails
			try {
				const res = await sendEmail.run(
					'New Friend Request Pending for ' + email,
					'There are so many friend request pending, please login to https://devbond.space and accept the request.',
				);
				console.log(res);
			} catch (err) {
				console.log(err.message);
			}
		}
	} catch (err) {
		console.log(err.message);
	}
});
