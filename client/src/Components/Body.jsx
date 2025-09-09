import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import toast from 'react-hot-toast';

const Body = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector((store) => store.user.data); // ← Fixed selector

	const fetchUser = async () => {
		if (userData) {
			setLoading(false);
			return;
		}

		try {
			const res = await axios.get(BASE_URL + '/profile/view', {
				withCredentials: true,
			});
			dispatch(addUser(res.data));
		} catch (err) {
			if (err.status === 401) {
				navigate('/login');
			} else {
				toast.error('Failed to load user data');
			}
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
					className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
				/>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			<NavBar />
			<main className="pt-20 pb-24 px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Outlet />
				</motion.div>
			</main>
			<Footer />
		</div>
	);
};

export default Body;
