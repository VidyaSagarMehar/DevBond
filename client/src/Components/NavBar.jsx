import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Home, Heart, Users, User, LogOut, Code2 } from 'lucide-react';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

const NavBar = () => {
	const [imageError, setImageError] = useState(false);
	const user = useSelector((store) => store.user.data); // ← Fixed selector
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
		} catch (err) {
			toast.error('Logout failed');
		}
	};

	const handleImageError = () => {
		setImageError(true);
	};

	const getProfileImageSrc = () => {
		if (imageError) {
			return 'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg';
		}

		const photoUrl = user?.photoUrl;

		if (photoUrl && photoUrl !== '') {
			return photoUrl;
		}

		return 'https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg';
	};

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
			{/* Desktop Navigation */}
			<nav className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50">
				<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 px-6 py-3">
					<div className="flex items-center space-x-8">
						{/* Logo */}
						<Link to="/" className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
								<Code2 className="w-5 h-5 text-white" />
							</div>
							<span className="font-bold text-gray-800">DevConnect</span>
						</Link>

						{/* Navigation Items */}
						<div className="flex items-center space-x-6">
							{navItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`relative flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
										location.pathname === item.path
											? 'bg-blue-100 text-blue-600'
											: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
									}`}
								>
									<item.icon className="w-5 h-5" />
									<span className="font-medium">{item.label}</span>
									{item.badge > 0 && (
										<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
											{item.badge > 99 ? '99+' : item.badge}
										</span>
									)}
								</Link>
							))}
						</div>

						{/* User Menu */}
						<div className="flex items-center space-x-4">
							<button
								onClick={handleLogout}
								className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
								title="Logout"
							>
								<LogOut className="w-5 h-5" />
							</button>

							<Link to="/profile" className="relative">
								<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-colors">
									<img
										src={getProfileImageSrc()}
										alt={`${user?.firstName || 'User'}'s profile`}
										className="w-full h-full object-cover"
										onError={handleImageError}
										onLoad={() => setImageError(false)}
									/>
								</div>
								<div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Navigation */}
			<div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
				<div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 px-4 py-3">
					<div className="flex items-center justify-around">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`relative p-3 rounded-xl transition-all ${
									location.pathname === item.path
										? 'bg-blue-100 text-blue-600'
										: 'text-gray-600'
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

						<Link
							to="/profile"
							className={`relative p-2 rounded-xl transition-all ${
								location.pathname === '/profile'
									? 'bg-blue-100 text-blue-600'
									: 'text-gray-600'
							}`}
						>
							<div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-200">
								<img
									src={getProfileImageSrc()}
									alt="Profile"
									className="w-full h-full object-cover"
									onError={handleImageError}
									onLoad={() => setImageError(false)}
								/>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default NavBar;
