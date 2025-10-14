import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
	Save,
	User,
	MapPin,
	Code,
	Globe,
	Github,
	Linkedin,
	Camera,
	Upload,
	Trash2,
} from 'lucide-react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import toast from 'react-hot-toast';

const EditProfile = ({ user }) => {
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState(user?.firstName || '');
	const [lastName, setLastName] = useState(user?.lastName || '');
	const [age, setAge] = useState(user?.age || '');
	const [gender, setGender] = useState(user?.gender || '');
	const [about, setAbout] = useState(user?.about || '');
	const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
	const [role, setRole] = useState(user?.role || '');
	const [location, setLocation] = useState(user?.location || '');
	const [skills, setSkills] = useState(user?.skills || []);
	const [github, setGithub] = useState(user?.github || '');
	const [linkedin, setLinkedin] = useState(user?.linkedin || '');
	const [website, setWebsite] = useState(user?.website || '');
	const [newSkill, setNewSkill] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [uploadingPhoto, setUploadingPhoto] = useState(false);

	const fileInputRef = useRef(null);

	// ✅ Cloudinary Upload
	const handlePhotoUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		if (!file.type.startsWith('image/'))
			return toast.error('Please upload an image');
		if (file.size > 5 * 1024 * 1024)
			return toast.error('File too large (max 5MB)');

		try {
			setUploadingPhoto(true);
			const formData = new FormData();
			formData.append('photo', file);

			const res = await axios.post(
				`${BASE_URL}/profile/upload-photo`,
				formData,
				{
					withCredentials: true,
					headers: { 'Content-Type': 'multipart/form-data' },
				},
			);

			setPhotoUrl(res.data.photoUrl);
			dispatch(addUser(res.data.data));
			toast.success('Photo uploaded successfully!');
		} catch (err) {
			toast.error(err.response?.data?.message || 'Upload failed');
		} finally {
			setUploadingPhoto(false);
		}
	};

	// ✅ Delete photo
	const handlePhotoDelete = async () => {
		if (!window.confirm('Are you sure you want to delete your profile photo?'))
			return;

		try {
			setUploadingPhoto(true);
			const res = await axios.delete(`${BASE_URL}/profile/delete-photo`, {
				withCredentials: true,
			});

			setPhotoUrl(res.data.data.photoUrl);
			dispatch(addUser(res.data.data));
			toast.success('Photo deleted successfully!');
		} catch (err) {
			toast.error(err.response?.data?.message || 'Delete failed');
		} finally {
			setUploadingPhoto(false);
		}
	};

	const addSkill = () => {
		if (newSkill.trim() && !skills.includes(newSkill.trim())) {
			setSkills([...skills, newSkill.trim()]);
			setNewSkill('');
		}
	};

	const removeSkill = (skillToRemove) => {
		setSkills(skills.filter((skill) => skill !== skillToRemove));
	};

	const saveProfile = async () => {
		setError('');
		try {
			setLoading(true);
			const res = await axios.patch(
				BASE_URL + '/profile/edit',
				{
					firstName,
					lastName,
					photoUrl,
					gender,
					age,
					about,
					role,
					location,
					skills,
					github,
					linkedin,
					website,
				},
				{ withCredentials: true },
			);
			dispatch(addUser(res?.data?.data));
			toast.success('Profile updated successfully! 🎉');
		} catch (err) {
			const errorMsg =
				err.response?.data?.message || 'Failed to update profile';
			setError(errorMsg);
			toast.error(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto px-4">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
						Edit Your Profile
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Make a great first impression
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* LEFT SIDE */}
					<div className="space-y-6">
						{/* 🔹 Profile Photo */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-white dark:bg-slate-800 dark:text-gray-100 rounded-2xl p-6 shadow-lg"
						>
							<h2 className="text-xl font-semibold mb-4 flex items-center">
								<Camera className="w-5 h-5 mr-2 text-blue-600" /> Profile Photo
							</h2>
							<div className="flex items-center space-x-6">
								<div className="relative">
									<img
										src={
											photoUrl ||
											'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg'
										}
										alt="Profile"
										className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 dark:border-blue-700"
									/>
									{uploadingPhoto && (
										<div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
											<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
										</div>
									)}
								</div>

								<div className="flex-1 space-y-3">
									<input
										ref={fileInputRef}
										type="file"
										accept="image/*"
										onChange={handlePhotoUpload}
										className="hidden"
									/>
									<button
										onClick={() => fileInputRef.current?.click()}
										disabled={uploadingPhoto}
										type="button"
										className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
									>
										<Upload className="w-4 h-4" />
										<span>
											{uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
										</span>
									</button>
									<button
										onClick={handlePhotoDelete}
										disabled={uploadingPhoto || !photoUrl}
										type="button"
										className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
									>
										<Trash2 className="w-4 h-4" />
										<span>Delete Photo</span>
									</button>
								</div>
							</div>
						</motion.div>

						{/* 🔹 Basic Info */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-white dark:bg-slate-800 dark:text-gray-100 rounded-2xl p-6 shadow-lg space-y-4"
						>
							<h2 className="text-xl font-semibold flex items-center">
								<User className="w-5 h-5 mr-2 text-blue-600" /> Basic
								Information
							</h2>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<input
									type="text"
									placeholder="First Name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
								/>
								<input
									type="text"
									placeholder="Last Name"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<input
									type="number"
									placeholder="Age"
									value={age}
									onChange={(e) => setAge(e.target.value)}
									className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
								/>
								<select
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
								>
									<option value="">Select Gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</select>
							</div>

							<input
								type="text"
								placeholder="Role (e.g. Frontend Developer)"
								value={role}
								onChange={(e) => setRole(e.target.value)}
								className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
							/>

							<div className="flex items-center space-x-2">
								<MapPin className="w-4 h-4 text-gray-500" />
								<input
									type="text"
									placeholder="Location"
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
								/>
							</div>

							<textarea
								rows="3"
								placeholder="About you..."
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
							/>
						</motion.div>

						{/* 🔹 Skills Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg space-y-4"
						>
							<h2 className="text-xl font-semibold flex items-center">
								<Code className="w-5 h-5 mr-2 text-blue-600" /> Skills
							</h2>
							<div className="flex space-x-2">
								<input
									type="text"
									placeholder="Add skill"
									value={newSkill}
									onChange={(e) => setNewSkill(e.target.value)}
									onKeyDown={(e) => e.key === 'Enter' && addSkill()}
									className="flex-1 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
								/>
								<button
									onClick={addSkill}
									className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
								>
									Add
								</button>
							</div>
							<div className="flex flex-wrap gap-2">
								{skills.map((skill, index) => (
									<span
										key={index}
										className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
									>
										{skill}
										<button
											onClick={() => removeSkill(skill)}
											className="ml-1 text-red-500 hover:text-red-700"
										>
											×
										</button>
									</span>
								))}
							</div>
						</motion.div>

						{/* 🔹 Social Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg space-y-4"
						>
							<h2 className="text-xl font-semibold flex items-center">
								<Globe className="w-5 h-5 mr-2 text-blue-600" /> Social Links
							</h2>
							<div className="space-y-3">
								<div className="flex items-center space-x-2">
									<Github className="w-4 h-4 text-gray-500" />
									<input
										type="text"
										placeholder="GitHub URL"
										value={github}
										onChange={(e) => setGithub(e.target.value)}
										className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
									/>
								</div>
								<div className="flex items-center space-x-2">
									<Linkedin className="w-4 h-4 text-gray-500" />
									<input
										type="text"
										placeholder="LinkedIn URL"
										value={linkedin}
										onChange={(e) => setLinkedin(e.target.value)}
										className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
									/>
								</div>
								<input
									type="text"
									placeholder="Website"
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
									className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
								/>
							</div>
						</motion.div>

						{/* Error + Save */}
						{error && <p className="text-red-500">{error}</p>}
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							disabled={loading}
							onClick={saveProfile}
							className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
						>
							{loading ? (
								'Saving...'
							) : (
								<>
									<Save className="inline w-5 h-5 mr-2" /> Save Profile
								</>
							)}
						</motion.button>
					</div>

					{/* RIGHT SIDE - Live Preview */}
					<div className="lg:sticky lg:top-8">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
						>
							<h2 className="text-xl font-semibold mb-4 text-center">
								Live Preview
							</h2>
							<UserCard
								user={{
									firstName,
									lastName,
									photoUrl,
									age,
									gender,
									about,
									role,
									location,
									skills,
									github,
									linkedin,
									website,
								}}
								showActions={false}
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
