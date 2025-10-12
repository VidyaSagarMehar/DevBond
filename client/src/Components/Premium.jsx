import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import { Crown, Star, Users, CheckCircle, MessageSquare } from 'lucide-react';

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
			<div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-700 dark:text-gray-200">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-6 rounded-2xl shadow-lg text-center"
				>
					<Crown className="mx-auto mb-3 w-10 h-10 text-yellow-300" />
					<h1 className="text-2xl font-semibold mb-1">
						🎉 You're already a Premium Member!
					</h1>
					<p className="text-sm opacity-80">Enjoy all your exclusive perks!</p>
				</motion.div>
			</div>
		);

	// Membership data (easily extendable in future)
	const plans = [
		{
			tier: 'Silver',
			price: '₹199 / month',
			color: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
			icon: <Star className="w-8 h-8 text-gray-400 mb-2" />,
			features: [
				'Chat with other members',
				'100 connection requests/day',
				'Verified Blue Tick',
				'Priority support',
			],
		},
		{
			tier: 'Gold',
			price: '₹399 / month',
			color: 'from-yellow-400 to-yellow-600 text-white',
			icon: <Crown className="w-8 h-8 text-white mb-2" />,
			features: [
				'Unlimited chat & connections',
				'Highlighted profile in feed',
				'Access to premium-only chat rooms',
				'Early access to new features',
				'1-on-1 mentorship opportunities',
				'Gold badge on your profile',
			],
		},
	];

	return (
		<div className="min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-12 text-gray-700 dark:text-gray-200">
			{plans.map((plan, index) => (
				<motion.div
					key={plan.tier}
					whileHover={{ y: -5 }}
					transition={{ type: 'spring', stiffness: 200 }}
					className={`w-full md:w-80 bg-gradient-to-b ${plan.color} rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 text-center transition-all duration-300`}
				>
					<div className="flex flex-col items-center">
						{plan.icon}
						<h2 className="text-2xl font-bold mb-1">{plan.tier} Membership</h2>
						<p className="text-sm opacity-80 mb-4">{plan.price}</p>
						<ul className="space-y-2 text-sm mb-6">
							{plan.features.map((feat, i) => (
								<li key={i} className="flex items-center justify-left gap-2">
									<CheckCircle className="w-4 h-4 text-green-500" />
									<span>{feat}</span>
								</li>
							))}
						</ul>
						<button
							onClick={() => handleBuyClick(plan.tier.toLowerCase())}
							className={`w-full py-2.5 rounded-xl font-medium transition-transform hover:scale-105 ${
								plan.tier === 'Gold'
									? 'bg-white text-yellow-700 hover:bg-gray-100'
									: 'bg-blue-600 text-white hover:bg-blue-700'
							}`}
						>
							Buy {plan.tier}
						</button>
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default Premium;
