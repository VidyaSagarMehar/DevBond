import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const Error = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 text-center px-6">
			{/* Animated icon */}
			<motion.div
				initial={{ scale: 0, rotate: -20 }}
				animate={{ scale: 1, rotate: 0 }}
				transition={{ type: 'spring', stiffness: 100, damping: 10 }}
				className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30"
			>
				<AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
			</motion.div>

			{/* Heading */}
			<motion.h1
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2"
			>
				Page Not Found
			</motion.h1>

			{/* Subtext */}
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="text-gray-500 dark:text-gray-400 mb-6 max-w-md"
			>
				Sorry, the page you’re looking for doesn’t exist or has been moved.
			</motion.p>

			{/* Button */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<Link
					to="/"
					className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
				>
					<Home className="w-5 h-5" />
					<span>Go Home</span>
				</Link>
			</motion.div>

			{/* Optional footer text */}
			<p className="mt-8 text-xs text-gray-400 dark:text-gray-500">
				Error code:{' '}
				<span className="font-semibold text-gray-600 dark:text-gray-300">
					404
				</span>
			</p>
		</div>
	);
};

export default Error;
