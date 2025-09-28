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
					throw new Error('Invalid email address ' + value);
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
						'Password must be at least 8 char, 1 uppercase, 1 lowercase, 1 special char, 1 number. Got: ' +
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
			lowercase: true,
			enum: {
				values: ['male', 'female', 'other'],
				message: `{VALUE} is not a valid gender type`,
			},
		},
		isPremium: {
			type: Boolean,
			default: false,
		},
		membershipType: {
			type: String,
		},
		photoUrl: {
			type: String,
			trim: true,
			default:
				'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg',
			validate(value) {
				if (!validator.isURL(value)) {
					throw new Error('Invalid photo URL ' + value);
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

		// 🔥 New fields for profile enhancements
		role: {
			type: String,
			trim: true,
			default: '',
		},
		location: {
			type: String,
			trim: true,
			default: '',
		},
		github: {
			type: String,
			trim: true,
			validate(value) {
				if (value && !validator.isURL(value)) {
					throw new Error('Invalid GitHub URL ' + value);
				}
			},
		},
		linkedin: {
			type: String,
			trim: true,
			validate(value) {
				if (value && !validator.isURL(value)) {
					throw new Error('Invalid LinkedIn URL ' + value);
				}
			},
		},
		website: {
			type: String,
			trim: true,
			validate(value) {
				if (value && !validator.isURL(value)) {
					throw new Error('Invalid Website URL ' + value);
				}
			},
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
