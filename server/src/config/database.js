const mongoose = require('mongoose');
const mongoose = require('mongoose');

const connectDB = async () => {
	await mongoose.connect('mongodb://localhost:27017/devTinder');
};

module.exports = connectDB;
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
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
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
exports.userSchema = userSchema;
