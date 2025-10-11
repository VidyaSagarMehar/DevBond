import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Heart,
	X,
	MapPin,
	Code,
	Github,
	Linkedin,
	Globe,
	Calendar,
	Star,
} from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import toast from 'react-hot-toast';

const UserCard = ({ user, showActions = true }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const dispatch = useDispatch();

	// Handle different user data structures and provide safe defaults
	const userData = user || {};
	const {
		_id,
		firstName = '',
		lastName = '',
		photoUrl = '',
		age,
		gender,
		about,
		skills = [],
		role,
		location,
		github,
		linkedin,
		website,
	} = userData;

	// Fix: Handle both single photoUrl and potential photos array
	const images =
		user?.photos && Array.isArray(user.photos)
			? user.photos
			: photoUrl
			? [photoUrl]
			: [
					'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg',
			  ];

	// Safe name handling - only show if both names exist
	const fullName =
		firstName && lastName
			? `${firstName} ${lastName}`
			: firstName
			? firstName
			: 'User Profile';

	const handleAction = async (action) => {
		if (!showActions || !_id) return;

		try {
			if (action === 'interested') {
				await axios.post(
					`${BASE_URL}/request/send/interested/${_id}`,
					{},
					{ withCredentials: true },
				);
				toast.success('Interest sent! 💙');
			} else {
				toast('Passed on this profile');
			}

			dispatch(removeUserFromFeed(_id));
		} catch (err) {
			toast.error('Something went wrong');
		}
	};

	const nextImage = () => {
		if (images.length > 1) {
			setCurrentImageIndex((prev) => (prev + 1) % images.length);
		}
	};

	const prevImage = () => {
		if (images.length > 1) {
			setCurrentImageIndex(
				(prev) => (prev - 1 + images.length) % images.length,
			);
		}
	};

	return (
		<div className="w-full max-w-sm mx-auto perspective-1000">
			<motion.div
				className="relative w-full h-[600px] preserve-3d"
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6 }}
			>
				{/* Front of card */}
				<div className="absolute inset-0 backface-hidden">
					<div className="relative h-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transition-colors">
						{/* Image Section */}
						<div className="relative h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
							<div
								className="absolute inset-0 cursor-pointer"
								onClick={nextImage}
							>
								<img
									src={images[currentImageIndex]}
									alt={`${fullName}'s profile`}
									className="w-full h-full object-cover"
									onError={(e) => {
										e.target.src =
											'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg';
									}}
								/>
							</div>

							{/* Image Navigation - Only show if multiple images */}
							{images.length > 1 && (
								<>
									<div className="absolute top-4 left-4 right-4 flex space-x-1">
										{images.map((_, index) => (
											<div
												key={index}
												className={`flex-1 h-1 rounded-full transition-all ${
													index === currentImageIndex
														? 'bg-white'
														: 'bg-white/30'
												}`}
											/>
										))}
									</div>

									<button
										onClick={prevImage}
										className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors"
									>
										←
									</button>
									<button
										onClick={nextImage}
										className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors"
									>
										→
									</button>
								</>
							)}

							{/* Online Status */}
							<div className="absolute top-4 right-4">
								<div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
									<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									<span className="text-white text-xs font-medium">Online</span>
								</div>
							</div>

							{/* Skills badges */}
							{skills && skills.length > 0 && (
								<div className="absolute top-16 left-4 flex flex-wrap gap-2 max-w-[calc(100%-2rem)]">
									{skills.slice(0, 3).map((skill, index) => (
										<span
											key={index}
											className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
										>
											{skill}
										</span>
									))}
									{skills.length > 3 && (
										<span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
											+{skills.length - 3}
										</span>
									)}
								</div>
							)}

							{/* Basic info overlay */}
							<div className="absolute bottom-4 left-4 right-4 text-white">
								<h2 className="text-3xl font-bold mb-2">{fullName}</h2>

								<div className="flex items-center space-x-4 mb-3">
									{age && (
										<div className="flex items-center space-x-1">
											<Calendar className="w-4 h-4" />
											<span className="text-lg">{age}</span>
										</div>
									)}

									{location && (
										<div className="flex items-center space-x-1">
											<MapPin className="w-4 h-4" />
											<span className="text-sm">{location}</span>
										</div>
									)}
								</div>

								<div className="space-y-1">
									{role && (
										<div className="flex items-center space-x-2">
											<Code className="w-4 h-4" />
											<span className="font-medium">{role}</span>
										</div>
									)}
									{location && (
										<div className="flex items-center space-x-2">
											<MapPin className="w-4 h-4" />
											<span className="text-sm">{location}</span>
										</div>
									)}
								</div>
							</div>

							{/* Flip button */}
							<button
								onClick={() => setIsFlipped(true)}
								className="absolute top-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
								title="View more details"
							>
								i
							</button>
						</div>

						{/* Info Section */}
						<div className="p-6 h-1/3 flex flex-col justify-between">
							<div>
								{about &&
									about !== 'This is a default about of the user' &&
									about.trim() && (
										<p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
											{about}
										</p>
									)}

								{(!about ||
									about === 'This is a default about of the user' ||
									!about.trim()) && (
									<p className="text-gray-400 dark:text-gray-500 text-sm italic mb-4">
										No bio added yet. Edit your profile to add a description!
									</p>
								)}
							</div>

							{/* Action buttons */}
							{showActions && (
								<div className="flex justify-center space-x-4">
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={() => handleAction('pass')}
										className="w-14 h-14 bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900 rounded-full flex items-center justify-center transition-colors group"
									>
										<X className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition-colors" />
									</motion.button>

									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={() => handleAction('interested')}
										className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
									>
										<Heart className="w-7 h-7 text-white" />
									</motion.button>

									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={() => setIsFlipped(true)}
										className="w-14 h-14 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
									>
										<Star className="w-6 h-6 text-blue-600 dark:text-blue-300" />
									</motion.button>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Back of card */}
				<div className="absolute inset-0 backface-hidden rotate-y-180">
					<div className="relative h-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden p-6 transition-colors">
						<button
							onClick={() => setIsFlipped(false)}
							className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
						>
							←
						</button>

						<div className="h-full flex flex-col">
							<div className="text-center mb-6">
								<div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-200 dark:border-blue-700">
									<img
										src={
											photoUrl ||
											'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg'
										}
										alt={fullName}
										className="w-full h-full object-cover"
										onError={(e) => {
											e.target.src =
												'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg';
										}}
									/>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
									{fullName}
								</h3>
								{role && (
									<p className="text-gray-600 dark:text-gray-400">{role}</p>
								)}
								{location && (
									<p className="text-gray-500 dark:text-gray-400 text-sm">
										📍 {location}
									</p>
								)}
							</div>

							<div className="space-y-4 flex-1 overflow-y-auto">
								{about &&
									about !== 'This is a default about of the user' &&
									about.trim() && (
										<div>
											<h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
												About
											</h4>
											<p className="text-gray-600 dark:text-gray-300 text-sm">
												{about}
											</p>
										</div>
									)}

								{skills && skills.length > 0 && (
									<div>
										<h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
											Skills
										</h4>
										<div className="flex flex-wrap gap-1">
											{skills.map((skill, index) => (
												<span
													key={index}
													className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full"
												>
													{skill}
												</span>
											))}
										</div>
									</div>
								)}

								<div>
									<h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
										Details
									</h4>
									<div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
										{age && <p>Age: {age}</p>}
										{gender && (
											<p>
												Gender:{' '}
												{gender.charAt(0).toUpperCase() + gender.slice(1)}
											</p>
										)}
										{location && <p>Location: {location}</p>}
									</div>
								</div>

								{/* Social Links */}
								{(github || linkedin || website) && (
									<div>
										<h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
											Connect
										</h4>
										<div className="flex space-x-3">
											{github && (
												<a
													href={github}
													target="_blank"
													rel="noopener noreferrer"
													className="w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
												>
													<Github className="w-4 h-4 text-gray-600 dark:text-gray-300" />
												</a>
											)}
											{linkedin && (
												<a
													href={linkedin}
													target="_blank"
													rel="noopener noreferrer"
													className="w-8 h-8 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
												>
													<Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-300" />
												</a>
											)}
											{website && (
												<a
													href={website}
													target="_blank"
													rel="noopener noreferrer"
													className="w-8 h-8 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 rounded-full flex items-center justify-center transition-colors"
												>
													<Globe className="w-4 h-4 text-green-600 dark:text-green-300" />
												</a>
											)}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default UserCard;
