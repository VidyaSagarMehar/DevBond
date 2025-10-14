const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'profile-photos', // Folder name in Cloudinary
		allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
		transformation: [
			{
				width: 500,
				height: 500,
				crop: 'fill',
				gravity: 'face', // Auto-crop to face
				quality: 'auto',
			},
		],
		public_id: (req, file) => {
			// Create unique filename with user ID
			return `user_${req.user._id}_${Date.now()}`;
		},
	},
});

module.exports = { cloudinary, storage };
