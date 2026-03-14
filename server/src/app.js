require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

connectDB();

app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://devbond.space',
			'https://www.devbond.space',
			'https://dev-bond.vercel.app',
		],
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());

// routes
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const paymentRouter = require('./routes/payment');
const chatRouter = require('./routes/chat');

app.use('/api', authRouter);
app.use('/api', profileRouter);
app.use('/api', requestRouter);
app.use('/api', userRouter);
app.use('/api', paymentRouter);
app.use('/api', chatRouter);

module.exports = app;
