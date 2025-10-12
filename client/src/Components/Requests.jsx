import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import toast from 'react-hot-toast';

const RequestCard = ({ request, onAction }) => {
	const {
		_id,
		firstName,
		lastName,
		photoUrl,
		gender,
		age,
		about,
		skills,
		role,
	} = request.fromUserId;
	const requestId = request._id;

	const handleAction = async (status) => {
		await onAction(status, requestId);
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.9, y: -20 }}
			transition={{ duration: 0.3 }}
			className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transition-colors"
		>
			{/* Header */}
			<div className="relative">
				<div className="h-32 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"></div>
				<div className="absolute -bottom-8 left-6">
					<div className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden bg-white dark:bg-gray-800">
						<img
							src={photoUrl || '/default-avatar.png'}
							alt={`${firstName}'s profile`}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
				<div className="absolute top-4 right-4">
					<div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
						<Heart className="w-4 h-4 text-white inline mr-1" />
						<span className="text-white text-sm font-medium">
							Interested in you
						</span>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="pt-10 p-6">
				<div className="mb-4">
					<h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
						{firstName} {lastName}
					</h3>

					<div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
						{role && <span>{role}</span>}
						{age && <span>{age} years</span>}
					</div>

					{about && (
						<p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
							{about}
						</p>
					)}

					{skills && skills.length > 0 && (
						<div className="mb-4">
							<div className="flex flex-wrap gap-2">
								{skills.slice(0, 4).map((skill, index) => (
									<span
										key={index}
										className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className="flex space-x-3">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => handleAction('rejected')}
						className="flex-1 cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900 text-gray-700 dark:text-gray-200 hover:text-red-700 dark:hover:text-red-400 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2"
					>
						<XCircle className="w-5 h-5" />
						<span>Decline</span>
					</motion.button>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => handleAction('accepted')}
						className="flex-1 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
					>
						<CheckCircle className="w-5 h-5" />
						<span>Accept</span>
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

const Requests = () => {
	const [loading, setLoading] = useState(false);
	const requests = useSelector((store) => store.requests);
	const dispatch = useDispatch();

	const reviewRequest = async (status, requestId) => {
		try {
			const res = await axios.post(
				`${BASE_URL}/request/review/${status}/${requestId}`,
				{},
				{ withCredentials: true },
			);

			dispatch(removeRequest(requestId));

			if (status === 'accepted') {
				toast.success('Connection accepted! 🎉');
			} else {
				toast('Request declined');
			}
		} catch (err) {
			toast.error('Something went wrong');
		}
	};

	const fetchRequests = async () => {
		try {
			setLoading(true);
			const res = await axios.get(`${BASE_URL}/user/requests/received`, {
				withCredentials: true,
			});
			dispatch(addRequests(res.data.data));
		} catch (err) {
			toast.error('Failed to load requests');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse"
						>
							<div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4"></div>
							<div className="space-y-3">
								<div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
								<div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (!requests || requests.length === 0) {
		return (
			<div className="container mx-auto px-4">
				<div className="text-center py-12">
					<div className="w-24 h-24 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-6">
						<Heart className="w-12 h-12 text-pink-500" />
					</div>
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
						No Connection Requests
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
						When developers are interested in connecting with you, their
						requests will appear here!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
					Connection Requests
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					{requests.length} developer{requests.length !== 1 ? 's' : ''}{' '}
					interested in connecting
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<AnimatePresence>
					{requests.map((request) => (
						<RequestCard
							key={request._id}
							request={request}
							onAction={reviewRequest}
						/>
					))}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Requests;
