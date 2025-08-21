const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			maxLength: 20,
		},
		lastName: {
			type: String,
			trim: true,
			maxLength: 20,
		},
		emailId: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Invalid email address' + value);
				}
			},
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
			validate(value) {
				if (!validator.isStrongPassword(value)) {
					throw new Error(
						'Password must be at least 8 char, 1 uppercas, 1 lowercase, 1 special char, 1 no.' +
							value,
					);
				}
			},
		},
		age: {
			type: Number,
			min: 18,
		},
		gender: {
			type: String,
			validate(value) {
				//custom validation check method
				// validation will not work on PUT/PATCH method, It only works while the document/user is about to be created for the first time
				if (!['male', 'female', 'other'].includes(value)) {
					throw new Error('Gender data is not valid');
				}
			},
		},
		photoUrl: {
			type: String,
			trim: true,
			default:
				'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg',
			validate(value) {
				if (!validator.isURL(value)) {
					throw new Error('Invalid photo URL' + value);
				}
			},
		},
		about: {
			type: String,
			default: 'This is a default about of the user',
		},
		skills: {
			type: [String],
		},
	},
	{ timestamps: true },
);

// Separating the JWT sign in schema level validation
userSchema.methods.getJWT = async function () {
	const user = this; // this is pointing to user instance
	const token = await jwt.sign({ _id: user._id }, 'ThisIsMySecretKey', {
		expiresIn: '7d',
	});
	return token;
};

// Separating the password validation in schema level validation
userSchema.methods.validatePassword = async function (passwordInputByUser) {
	const user = this; // this is pointing to user instance
	const passwordHash = user.password;
	const isPasswordValid = await bcrypt.compare(
		passwordInputByUser,
		passwordHash,
	);
	return isPasswordValid;
};

module.exports = mongoose.model('User', userSchema);
