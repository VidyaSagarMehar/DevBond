import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	Home,
	Heart,
	Users,
	User,
	LogOut,
	Code2,
	BadgeCheck,
	Moon,
	Sun,
	ChevronDown,
} from 'lucide-react';
import { removeUser } from '../utils/userSlice';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
	const [imageError, setImageError] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const user = useSelector((store) => store.user.data);
	const requests = useSelector((store) => store.requests);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
			dispatch(removeUser());
			toast.success('Logged out successfully');
			navigate('/login');
		} catch {
			toast.error('Logout failed');
		}
	};

	const getProfileImageSrc = () =>
		imageError || !user?.photoUrl
			? 'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg'
			: user.photoUrl;

	const navItems = [
		{ path: '/', icon: Home, label: 'Discover' },
		{
			path: '/requests',
			icon: Heart,
			label: 'Requests',
			badge: requests?.length || 0,
		},
		{ path: '/connections', icon: Users, label: 'Connections' },
		{ path: '/profile', icon: User, label: 'Profile' },
	];

	if (!user) return null;

	return (
		<>
			{/* Desktop Nav */}
			<nav className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50">
				<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 px-6 py-3 transition-colors duration-300">
					<div className="flex items-center space-x-8">
						{/* Logo */}
						<Link to="/" className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
								<Code2 className="w-5 h-5 text-white" />
							</div>
							<span className="font-bold text-gray-800 dark:text-white">
								DevBond
							</span>
						</Link>

						{/* Nav Items */}
						<div className="flex items-center space-x-6">
							{navItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`relative flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
										location.pathname === item.path
											? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300'
											: 'text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800'
									}`}
								>
									<item.icon className="w-5 h-5" />
									<span className="font-medium">{item.label}</span>
									{item.badge > 0 && (
										<span className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
											{item.badge > 99 ? '99+' : item.badge}
										</span>
									)}
								</Link>
							))}
						</div>

						{/* Profile + Dropdown */}
						<div
							className="relative"
							onMouseEnter={() => setDropdownOpen(true)}
							onMouseLeave={() => setDropdownOpen(false)}
						>
							<button className="flex items-center space-x-2 group cursor-pointer">
								<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-300 dark:border-blue-700 group-hover:border-blue-500 transition">
									<img
										src={getProfileImageSrc()}
										alt="Profile"
										onError={() => setImageError(true)}
										className="w-full h-full object-cover"
									/>
								</div>
								<ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
							</button>

							<AnimatePresence>
								{dropdownOpen && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
									>
										{/* Greeting */}
										<div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
											<p className="text-sm text-gray-500 dark:text-gray-400">
												Hi,{' '}
												<span className="font-medium">{user.firstName}</span> 👋
											</p>
										</div>

										{/* Menu Options */}
										<Link
											to="/profile"
											className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
										>
											<User className="w-4 h-4" /> My Profile
										</Link>

										<Link
											to="/premium"
											className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
										>
											<BadgeCheck className="w-4 h-4 text-blue-500" /> Premium
										</Link>

										<button
											onClick={toggleTheme}
											className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
										>
											{theme === 'light' ? (
												<>
													<Moon className="w-4 h-4" /> Dark Mode
												</>
											) : (
												<>
													<Sun className="w-4 h-4 text-yellow-400" /> Light Mode
												</>
											)}
										</button>

										<button
											onClick={handleLogout}
											className="flex w-full items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition cursor-pointer"
										>
											<LogOut className="w-4 h-4" /> Logout
										</button>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Nav */}
			<div className="md:hidden fixed bottom-5 left-4 right-4 z-50">
				<div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg px-4 py-2 flex justify-around transition-colors duration-300">
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={`relative p-3 rounded-xl transition-all ${
								location.pathname === item.path
									? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300'
									: 'text-gray-600 dark:text-gray-300'
							}`}
						>
							<item.icon className="w-6 h-6" />
							{item.badge > 0 && (
								<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
									{item.badge > 9 ? '9+' : item.badge}
								</span>
							)}
						</Link>
					))}

					{/* Profile Dropdown for mobile */}
					<div className="relative">
						<button
							onClick={() => setDropdownOpen((prev) => !prev)}
							className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-300 dark:border-blue-700"
						>
							<img
								src={getProfileImageSrc()}
								onError={() => setImageError(true)}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</button>

						<AnimatePresence>
							{dropdownOpen && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									className="absolute bottom-14 right-0 w-44 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2"
								>
									{/* Greeting */}
									<div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
										<p className="text-sm text-gray-500 dark:text-gray-400">
											Hi, <span className="font-medium">{user.firstName}</span>{' '}
											👋
										</p>
									</div>

									<Link
										to="/profile"
										className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
										onClick={() => setDropdownOpen(false)}
									>
										<User className="w-4 h-4" /> My Profile
									</Link>
									<Link
										to="/premium"
										className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
										onClick={() => setDropdownOpen(false)}
									>
										<BadgeCheck className="w-4 h-4 text-blue-500" /> Premium
									</Link>
									<button
										onClick={() => {
											toggleTheme();
											setDropdownOpen(false);
										}}
										className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
									>
										{theme === 'light' ? (
											<>
												<Moon className="w-4 h-4" /> Dark Mode
											</>
										) : (
											<>
												<Sun className="w-4 h-4 text-yellow-400" /> Light Mode
											</>
										)}
									</button>
									<button
										onClick={handleLogout}
										className="flex w-full items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
									>
										<LogOut className="w-4 h-4" /> Logout
									</button>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</>
	);
};

export default NavBar;
5;
