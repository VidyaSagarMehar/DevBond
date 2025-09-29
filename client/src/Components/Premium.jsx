import React from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useState } from 'react';

const Premium = () => {
	// Handler function to verify the payment - after the payment was made by a user
	const [isUserPremium, setIsUserPremium] = useState(false);
	const verifyPremiumUser = async () => {
		const res = await axios.get(BASE_URL + '/premium/verify', {
			withCredentials: true,
		});
		if (res.data.isPremium) {
			setIsUserPremium(true);
		}
	};

	const handleBuyClick = async (type) => {
		const order = await axios.post(
			BASE_URL + '/payment/create',
			{
				membershipType: type,
			},
			{ withCredentials: true },
		);

		// it should open the razorpay dialogbox
		const { amount, keyId, currency, notes, orderId } = order.data;

		const options = {
			key: keyId,
			amount,
			currency,
			name: 'DevBond',
			description: 'Connect to other developers',
			order_id: orderId,
			prefill: {
				name: notes.firstNmae + ' ' + notes.lastNmae,
				email: notes.emailId,
				contact: '9999999999',
			},
			theme: {
				color: '#F37254',
			},
			// Handler function to verify the payment - after the payment was made by a user
			handler: verifyPremiumUser,
		};

		const rzp = new window.Razorpay(options);
		rzp.open();
	};
	return isUserPremium ? (
		"You're already a premium member"
	) : (
		<div className="flex w-full text-white m-10 mx-auto">
			<div className="card bg-base-200 rounded-box grid h-80 grow place-items-center">
				<h1>Silver Membership</h1>
				<ul>
					<li>Chat With other People</li>
					<li>100 connection req per day</li>
					<li>Blue Tick</li>
				</ul>
				<button
					onClick={() => handleBuyClick('silver')}
					className="btn btn-secondary"
				>
					Buy Silver
				</button>
			</div>
			<div className="divider divider-horizontal">OR</div>
			<div className="card bg-base-200 rounded-box grid h-80 grow place-items-center">
				<h1>Gold Membership</h1>
				<ul>
					<li>Chat With other People</li>
					<li>100 connection req per day</li>
					<li>Blue Tick</li>
				</ul>
				<button
					onClick={() => handleBuyClick('gold')}
					className="btn btn-primary"
				>
					Buy Gold
				</button>
			</div>
		</div>
	);
};

export default Premium;
