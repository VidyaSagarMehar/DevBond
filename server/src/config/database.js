const mongoose = require('mongoose');

const connectDB = async () => {
	await mongoose.connect(
		'mongodb+srv://VidyaSagar:vidya1234@cluster0.hon2liv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
	);
};

module.exports = connectDB;
