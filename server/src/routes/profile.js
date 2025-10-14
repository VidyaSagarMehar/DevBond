const express = require('express');
const { userAuth } = require('../middleware/auth');
const { validateEditProfileData } = require('../utils/validation');
const upload = require('../middleware/upload');
const { cloudinary } = require('../config/cloudinary');

const profileRouter = express.Router();

// Get profile of the user
profileRouter.get('/profile/view', userAuth, async (req, res) => {
	try {
		const user = req.user;
		res.send(user);
	} catch (err) {
		res
			.status(400)
			.send({ error: 'error getting the profile', message: err.message });
	}
});

// Upload profile photo
profileRouter.post(
	'/profile/upload-photo',
	userAuth,
	upload.single('photo'),
	async (req, res) => {
		try {
			if (!req.file) {
				return res.status(400).json({ error: 'No file uploaded' });
			}

			const loggedInUser = req.user;

			// Delete old photo from Cloudinary if it exists and is not default
			if (
				loggedInUser.photoUrl &&
				loggedInUser.photoUrl.includes('cloudinary.com')
			) {
				// Extract public_id from URL
				const urlParts = loggedInUser.photoUrl.split('/');
				const publicIdWithExt = urlParts[urlParts.length - 1];
				const publicId = `profile-photos/${publicIdWithExt.split('.')[0]}`;

				try {
					await cloudinary.uploader.destroy(publicId);
				} catch (deleteError) {
					console.log('Error deleting old photo:', deleteError);
					// Continue even if deletion fails
				}
			}

			// Update user with new photo URL
			loggedInUser.photoUrl = req.file.path;
			await loggedInUser.save();

			res.json({
				message: 'Photo uploaded successfully',
				photoUrl: req.file.path,
				data: loggedInUser,
			});
		} catch (err) {
			res.status(400).send({
				error: 'Error uploading photo',
				message: err.message,
			});
		}
	},
);

// Edit the profile (text fields only)
profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
	try {
		if (validateEditProfileData(req)) {
			throw new Error('Invalid Edit Request');
		}
		const loggedInUser = req.user;

		Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

		await loggedInUser.save();

		res.json({
			message: `${loggedInUser.firstName}, your profile updated successfully`,
			data: loggedInUser,
		});
	} catch (err) {
		res.status(400).send({
			error: 'error editing the profile',
			message: err.message,
		});
	}
});

// Delete profile photo (reset to default)
profileRouter.delete('/profile/delete-photo', userAuth, async (req, res) => {
	try {
		const loggedInUser = req.user;

		// Delete from Cloudinary if it's a Cloudinary URL
		if (
			loggedInUser.photoUrl &&
			loggedInUser.photoUrl.includes('cloudinary.com')
		) {
			const urlParts = loggedInUser.photoUrl.split('/');
			const publicIdWithExt = urlParts[urlParts.length - 1];
			const publicId = `profile-photos/${publicIdWithExt.split('.')[0]}`;

			await cloudinary.uploader.destroy(publicId);
		}

		// Reset to default photo
		loggedInUser.photoUrl =
			'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg';
		await loggedInUser.save();

		res.json({
			message: 'Photo deleted successfully',
			data: loggedInUser,
		});
	} catch (err) {
		res.status(400).send({
			error: 'Error deleting photo',
			message: err.message,
		});
	}
});

module.exports = profileRouter;
