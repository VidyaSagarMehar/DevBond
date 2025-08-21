const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
	try {
		// Read the token from the req cookie
		const { token } = req.cookies;
		if (!token) {
			throw new Error('token is not valid!');
		}
		// validate the token
		const decodeObj = await jwt.verify(token, 'ThisIsMySecretKey');

		// find the user
		const { _id } = decodeObj;
		const user = await User.findById(_id);
		if (!user) {
			throw new Error('User not found');
		}

		// send the user data to the req Obj
		req.user = user;
		next();
	} catch (err) {
		res.status(400).send('error : ' + err.message);
	}
};

module.exports = { userAuth };
