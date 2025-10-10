import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

const Premium = () => {
	const [isUserPremium, setIsUserPremium] = useState(false);

	useEffect(() => {
		verifyPremiumUser();
	}, []);

	const verifyPremiumUser = async () => {
		try {
			const res = await axios.get(BASE_URL + '/premium/verify', {
				withCredentials: true,
			});
			if (res.data.isPremium) setIsUserPremium(true);
		} catch {
			toast.error('Failed to verify premium status');
		}
	};

	const handleBuyClick = async (type) => {
		try {
			const order = await axios.post(
				BASE_URL + '/payment/create',
				{ membershipType: type },
				{ withCredentials: true },
			);
			const { amount, keyId, currency, notes, orderId } = order.data;

			const options = {
				key: keyId,
				amount,
				currency,
				name: 'DevBond Premium',
				description: `${type} membership`,
				order_id: orderId,
				prefill: {
					name: `${notes.firstName || ''} ${notes.lastName || ''}`,
					email: notes.emailId,
					contact: '9999999999',
				},
				theme: { color: '#2563eb' },
				handler: verifyPremiumUser,
			};

			new window.Razorpay(options).open();
		} catch {
			toast.error('Payment initiation failed');
		}
	};

	if (isUserPremium)
		return (
			<div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-700">
				<motion.h1
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-2xl font-semibold"
				>
					🎉 You're already a Premium Member!
				</motion.h1>
			</div>
		);

	return (
		<div className="min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 text-gray-700">
			{['Silver', 'Gold'].map((tier) => (
				<motion.div
					key={tier}
					whileHover={{ scale: 1.05 }}
					className="w-full md:w-80 bg-white rounded-2xl shadow-md border border-gray-200 p-6 text-center"
				>
					<h2 className="text-xl font-bold text-blue-600 mb-3">
						{tier} Membership
					</h2>
					<ul className="space-y-2 text-sm text-gray-600 mb-4">
						<li>💬 Chat with other developers</li>
						<li>🔗 100 connection requests/day</li>
						<li>✔️ Blue verification tick</li>
					</ul>
					<button
						onClick={() => handleBuyClick(tier.toLowerCase())}
						className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition"
					>
						Buy {tier}
					</button>
				</motion.div>
			))}
		</div>
	);
};

export default Premium;
