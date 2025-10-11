import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Phone, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ConnectionCard = ({ connection, index }) => {
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
		location,
	} = connection;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.1 }}
			className="bg-white dark:bg-slate-800 dark:text-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
		>
			{/* Header with avatar and basic info */}
			<div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600">
				<div className="flex items-start space-x-4">
					<div className="relative">
						<img
							src={photoUrl || '/default-avatar.png'}
							alt={`${firstName}'s profile`}
							className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
						/>
						<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
					</div>

					<div className="flex-1 text-white">
						<h3 className="text-xl font-bold">
							{firstName} {lastName}
						</h3>
						<p className="text-blue-100">{role || 'Developer'}</p>
						{age && gender && (
							<p className="text-blue-100 text-sm mt-1">
								{age} years • {gender}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="p-6">
				{about && (
					<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
						{about}
					</p>
				)}

				{/* Skills */}
				{skills && skills.length > 0 && (
					<div className="mb-4">
						<h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
							Skills
						</h4>
						<div className="flex flex-wrap gap-2">
							{skills.slice(0, 4).map((skill, idx) => (
								<span
									key={idx}
									className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-xs font-medium rounded-full"
								>
									{skill}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Action buttons */}
				<div className="flex space-x-1">
					<Link to={'/chat/' + _id} className="w-full flex justify-center">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="w-5/5 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center space-x-2"
						>
							<MessageCircle className="w-4 h-4" />
							<span>Message</span>
						</motion.button>
					</Link>

					{/* <motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-xl transition-colors"
					>
						<Phone className="w-4 h-4" />
					</motion.button> */}
				</div>
			</div>
		</motion.div>
	);
};

const Connections = () => {
	const [loading, setLoading] = useState(false);
	const connections = useSelector((store) => store.connections);
	const dispatch = useDispatch();

	const fetchConnections = async () => {
		try {
			setLoading(true);
			const res = await axios.get(BASE_URL + '/user/connections', {
				withCredentials: true,
			});
			dispatch(addConnections(res.data.data));
		} catch (err) {
			toast.error('Failed to load connections');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchConnections();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse"
						>
							<div className="flex items-center space-x-4 mb-4">
								<div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
								<div className="space-y-2">
									<div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
									<div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (!connections || connections.length === 0) {
		return (
			<div className="container mx-auto px-4">
				<div className="text-center py-12">
					<div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
						<Users className="w-12 h-12 text-blue-500 dark:text-blue-300" />
					</div>
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
						No Connections Yet
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
						Start swiping and connecting with developers to see your connections
						here!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
					My Connections
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					{connections.length} developer{connections.length !== 1 ? 's' : ''} in
					your network
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{connections.map((connection, index) => (
					<ConnectionCard
						key={connection._id}
						connection={connection}
						index={index}
					/>
				))}
			</div>
		</div>
	);
};

export default Connections;
