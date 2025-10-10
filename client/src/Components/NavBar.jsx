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
} from 'lucide-react';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

const NavBar = () => {
	const [imageError, setImageError] = useState(false);
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
			{/* Desktop */}
			<nav className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50">
				<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 px-6 py-3">
					<div className="flex items-center space-x-8">
						<Link to="/" className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
								<Code2 className="w-5 h-5 text-white" />
							</div>
							<span className="font-bold text-gray-800">DevBond</span>
						</Link>

						<div className="flex items-center space-x-6">
							{navItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`relative flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
										location.pathname === item.path
											? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700'
											: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
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

						<div className="flex items-center space-x-4">
							<Link to="/premium" title="Premium">
								<BadgeCheck className="w-5 h-5 text-blue-500 hover:text-blue-700" />
							</Link>
							<button
								onClick={handleLogout}
								className="p-2 text-gray-600 hover:text-red-600 transition"
								title="Logout"
							>
								<LogOut className="w-5 h-5" />
							</button>
							<Link to="/profile">
								<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-300 hover:border-blue-500 transition">
									<img
										src={getProfileImageSrc()}
										alt="Profile"
										onError={() => setImageError(true)}
										className="w-full h-full object-cover"
									/>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile */}
			<div className="md:hidden fixed bottom-5 left-4 right-4 z-50">
				<div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg px-4 py-2 flex justify-around">
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={`relative p-3 rounded-xl transition-all ${
								location.pathname === item.path
									? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700'
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
				</div>
			</div>
		</>
	);
};

export default NavBar;
