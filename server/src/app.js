require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('./utils/cronJob');
const http = require('http');

app.use(
	cors({
		origin: 'http://localhost:5173',
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
const initializeSocket = require('./utils/socket');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/', paymentRouter);

// server for socket.io
const server = http.createServer(app);
initializeSocket(server);

connectDB()
	.then(() => {
		console.log('Database Connected sucessfully');
		server.listen(process.env.PORT, () => {
			console.log(
				`Server is successfully listining on port ${process.env.PORT}`,
			);
		});
	})
	.catch((err) => {
		console.log(err);
		console.error('Data cannot be connected');
	});
