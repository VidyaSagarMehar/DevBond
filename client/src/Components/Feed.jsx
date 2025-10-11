import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import toast from 'react-hot-toast';

const Feed = () => {
	const [loading, setLoading] = useState(false);
	const feed = useSelector((store) => store.feed);
	const user = useSelector((store) => store.user.data);
	const dispatch = useDispatch();

	const getFeed = async () => {
		try {
			setLoading(true);
			const res = await axios.get(BASE_URL + '/feed', {
				withCredentials: true,
			});
			console.log('Feed response:', res.data.data);
			dispatch(addFeed(res.data.data));
		} catch (err) {
			toast.error('Failed to load feed');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			getFeed();
		}
	}, [user]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[600px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"></div>
			</div>
		);
	}

	if (!feed || feed.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[600px] text-center px-6">
				<div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
					<Heart className="w-12 h-12 text-blue-500 dark:text-blue-300" />
				</div>
				<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
					No more developers nearby!
				</h2>
				<p className="text-gray-600 dark:text-gray-400 max-w-md">
					You've seen all available developers in your area. Check back later
					for new matches!
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-100">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Discover Developers
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					Swipe right to connect, left to pass
				</p>
			</div>

			<AnimatePresence mode="wait">
				{feed.length > 0 && (
					<UserCard key={feed[0]._id} user={feed[0]} showActions={true} />
				)}
			</AnimatePresence>
		</div>
	);
};

export default Feed;
