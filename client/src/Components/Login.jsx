import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Code2 } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { clearFeed } from '../utils/feedSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

const Login = () => {
	const [formData, setFormData] = useState({
		emailId: '',
		password: '',
		firstName: '',
		lastName: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const endpoint = isLoginForm ? '/login' : '/signup';
			const payload = isLoginForm
				? { emailId: formData.emailId, password: formData.password }
				: formData;

			const res = await axios.post(BASE_URL + endpoint, payload, {
				withCredentials: true,
			});

			dispatch(removeUser());
			dispatch(clearFeed());
			dispatch(addUser(res.data.data || res.data));

			toast.success(isLoginForm ? 'Welcome back! 🚀' : 'Account created! 🎉');
			navigate(isLoginForm ? '/' : '/profile');
		} catch (err) {
			toast.error(err?.response?.data?.message || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative w-full max-w-md"
			>
				{/* Logo/Brand */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
						<Code2 className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
						DevBond
					</h1>
					<p className="text-gray-600 dark:text-gray-300 mt-2">
						{isLoginForm ? 'Welcome back!' : 'Join the developer community'}
					</p>
				</div>

				{/* Form Card */}
				<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 p-8 transition-all duration-300">
					<form onSubmit={handleSubmit} className="space-y-6">
						{!isLoginForm && (
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										First Name
									</label>
									<input
										type="text"
										required
										value={formData.firstName}
										onChange={(e) =>
											setFormData({ ...formData, firstName: e.target.value })
										}
										className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="John"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Last Name
									</label>
									<input
										type="text"
										required
										value={formData.lastName}
										onChange={(e) =>
											setFormData({ ...formData, lastName: e.target.value })
										}
										className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
										placeholder="Doe"
									/>
								</div>
							</div>
						)}

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Email Address
							</label>
							<input
								type="email"
								required
								value={formData.emailId}
								onChange={(e) =>
									setFormData({ ...formData, emailId: e.target.value })
								}
								className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								placeholder="john@example.com"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									required
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									className="w-full px-4 py-3 pr-12 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>

						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
						>
							{loading ? (
								<span className="flex items-center justify-center">
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
									{isLoginForm ? 'Signing in...' : 'Creating account...'}
								</span>
							) : isLoginForm ? (
								'Sign In'
							) : (
								'Create Account'
							)}
						</motion.button>
					</form>

					<div className="mt-6 text-center">
						<button
							onClick={() => setIsLoginForm(!isLoginForm)}
							className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors cursor-pointer"
						>
							{isLoginForm
								? "Don't have an account? Sign up"
								: 'Already have an account? Sign in'}
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Login;
