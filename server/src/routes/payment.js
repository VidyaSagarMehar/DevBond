require('dotenv').config();
const express = require('express');
const { userAuth } = require('../middleware/auth');
const razorpayInstance = require('../utils/razorpay');
const Payment = require('../models/payment');
const { membershipAmount } = require('../utils/constants');
const User = require('../models/user');
const {
	validateWebhookSignature,
} = require('razorpay/dist/utils/razorpay-utils');

const paymentRouter = express.Router();

// Create payment route
paymentRouter.post('/payment/create', userAuth, async (req, res) => {
	try {
		const { membershipType } = req.body;
		const { firstName, lastName, emailId } = req.user;

		const order = await razorpayInstance.orders.create({
			amount: membershipAmount[membershipType] * 100,
			currency: 'INR',
			receipt: 'receipt#1',
			notes: {
				firstName,
				lastName,
				emailId,
				membershipType: membershipType,
			},
		});
		// Save it in database
		console.log(order);
		const payment = new Payment({
			userId: req.user._id,
			orderId: order.id,
			status: order.status,
			amount: order.amount,
			currency: order.currency,
			receipt: order.receipt,
			notes: order.notes,
		});
		const savedPayment = await payment.save();

		// reurn back order details to frontend
		res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

// Webhook API - we do not need to Authenticate for this route
paymentRouter.post('/payment/webhook', async (req, res) => {
	try {
		const webhookSignature = req.get['x-Razorpay-Signature']; //get it from the req.headers (.get = .headers)

		const isWebhookValid = validateWebhookSignature(
			JSON.stringify(req.body),
			webhookSignature,
			process.env.RAZORPAY_WEBHOOK_SECRET,
		);
		if (!isWebhookValid) {
			return res.status(400).json({ message: 'webhook signature is invalid' });
		}
		// Update the payment status in DB to successfull and user premium to true
		const paymentDetails = req.body.payload.payment.entity;

		const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
		payment.status = paymentDetails.status;
		await payment.save();

		// Update the User to premium
		const user = await User.findOne({ _id: payment.userId });
		user.isPremium = true;
		user.membershipType = payment.notes.membershipType;
		await user.save();

		// if (req.body.event == 'payment.captured') {
		// }
		// if (req.body.event == 'payment.failed') {
		// }

		// return success response to razorpay
		return res.status(200).json({ message: 'webhook recieved successfully' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = paymentRouter;
