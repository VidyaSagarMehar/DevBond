import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Save,
	User,
	MapPin,
	Code,
	Globe,
	Github,
	Linkedin,
} from 'lucide-react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import toast from 'react-hot-toast';

const EditProfile = ({ user }) => {
	console.log('EditProfile user:', user);

	// Initialize state with user data
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

	const dispatch = useDispatch();

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
					{/* Form Section */}
					<div className="space-y-6">
						{/* Basic Info Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-white dark:bg-slate-800 dark:text-gray-100 rounded-2xl p-6 shadow-lg"
						>
							<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
								<User className="w-5 h-5 mr-2 text-blue-600" />
								Basic Information
							</h2>

							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											First Name
										</label>
										<input
											type="text"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
											placeholder="John"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Last Name
										</label>
										<input
											type="text"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
											placeholder="Doe"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Age
										</label>
										<input
											type="number"
											value={age}
											onChange={(e) => setAge(e.target.value)}
											className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
											placeholder="25"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Gender
										</label>
										<select
											value={gender}
											onChange={(e) => setGender(e.target.value)}
											className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										>
											<option value="">Select Gender</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Other</option>
										</select>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Professional Role
									</label>
									<input
										type="text"
										value={role}
										onChange={(e) => setRole(e.target.value)}
										className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="Frontend Developer"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
										<MapPin className="w-4 h-4 mr-1 text-blue-600" />
										Location
									</label>
									<input
										type="text"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
										className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="San Francisco, CA"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										About Me
									</label>
									<textarea
										rows={4}
										value={about}
										onChange={(e) => setAbout(e.target.value)}
										className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
										placeholder="Tell us about yourself, your passion for coding, and what you're looking for..."
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Profile Photo URL
									</label>
									<input
										type="url"
										value={photoUrl}
										onChange={(e) => setPhotoUrl(e.target.value)}
										className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="https://example.com/your-photo.jpg"
									/>
								</div>
							</div>
						</motion.div>

						{/* Skills Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="bg-white dark:bg-slate-800 dark:text-gray-100 rounded-2xl p-6 shadow-lg"
						>
							<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
								<Code className="w-5 h-5 mr-2 text-blue-600" />
								Skills & Technologies
							</h2>

							<div className="space-y-4">
								<div className="flex space-x-2">
									<input
										type="text"
										value={newSkill}
										onChange={(e) => setNewSkill(e.target.value)}
										onKeyPress={(e) => e.key === 'Enter' && addSkill()}
										className="flex-1 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="Add a skill (e.g., React, Python)"
									/>
									<button
										onClick={addSkill}
										type="button"
										className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
									>
										Add
									</button>
								</div>

								<div className="flex flex-wrap gap-2">
									{skills.map((skill, index) => (
										<span
											key={index}
											className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
										>
											{skill}
											<button
												onClick={() => removeSkill(skill)}
												type="button"
												className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
											>
												×
											</button>
										</span>
									))}
								</div>
							</div>
						</motion.div>

						{/* Social Links Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="bg-white dark:bg-slate-800 dark:text-gray-100 rounded-2xl p-6 shadow-lg"
						>
							<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
								<Globe className="w-5 h-5 mr-2 text-blue-600" />
								Social Links
							</h2>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
										<Github className="w-4 h-4 mr-1 text-gray-600" />
										GitHub
									</label>
									<input
										type="url"
										value={github}
										onChange={(e) => setGithub(e.target.value)}
										className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="https://github.com/yourusername"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
										<Linkedin className="w-4 h-4 mr-1 text-blue-600" />
										LinkedIn
									</label>
									<input
										type="url"
										value={linkedin}
										onChange={(e) => setLinkedin(e.target.value)}
										className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="https://linkedin.com/in/yourprofile"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
										<Globe className="w-4 h-4 mr-1 text-green-600" />
										Personal Website
									</label>
									<input
										type="url"
										value={website}
										onChange={(e) => setWebsite(e.target.value)}
										className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="https://yourportfolio.com"
									/>
								</div>
							</div>
						</motion.div>

						{/* Error Display */}
						{error && (
							<div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-4">
								<p className="text-red-600 dark:text-red-300 text-sm">
									{error}
								</p>
							</div>
						)}

						{/* Save Button */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={saveProfile}
							disabled={loading}
							type="button"
							className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
						>
							{loading ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
									<span>Saving...</span>
								</>
							) : (
								<>
									<Save className="w-5 h-5" />
									<span>Save Profile</span>
								</>
							)}
						</motion.button>
					</div>

					{/* Preview Section */}
					<div className="lg:sticky lg:top-8">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
						>
							<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
								Live Preview
							</h2>
							{/* Pass all current state values to UserCard */}
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
