const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// routes
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

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
