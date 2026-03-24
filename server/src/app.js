require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const app = express();
app.set('trust proxy', 1);

const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
if (process.env.ENABLE_CRON === 'true') {
	require('./utils/cronJob');
}

app.use(
	cors({
		origin: function (origin, callback) {
			const allowedOrigins = [
				'http://localhost:5173',
				'https://dev-bond.vercel.app',
			];
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
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

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/', paymentRouter);
app.use('/', chatRouter);

// server for socket.io
const server = http.createServer(app);
const initializeSocket = require('./utils/socket');
initializeSocket(server);

// ✅ PORT FIX (RENDER REQUIRED)
const PORT = process.env.PORT || 3000;

connectDB()
	.then(() => {
		console.log('Database Connected successfully');
		server.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error('Database connection failed', err);
	});
