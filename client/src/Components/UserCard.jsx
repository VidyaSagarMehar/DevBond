import React, { use } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
	if (!user) return null;
	const { _id, firstName, lastName, photoUrl, about, age, gender } = user;
	const dispatch = useDispatch();

	const handleSendRequest = async (status, _id) => {
		try {
			const res = await axios.post(
				BASE_URL + '/request/send/' + status + '/' + _id,
				{},
				{ withCredentials: true },
			);
			dispatch(removeUserFromFeed(_id));
		} catch (err) {
			// TODO:Toastify needs to be added
			console.log(err.message);
		}
	};

	return (
		<div>
			<div className="card bg-base-300 w-96 shadow-sm">
				<figure>
					<img src={photoUrl} alt="Profile Image" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">{firstName + ' ' + lastName}</h2>
					{age && gender && <p>{age + ' ' + gender}</p>}
					<p>{about}</p>
					<div className="card-actions justify-center">
						<button
							onClick={() => handleSendRequest('ignored', _id)}
							className="btn btn-primary"
						>
							Ignore
						</button>
						<button
							onClick={() => handleSendRequest('interested', _id)}
							className="btn btn-secondary"
						>
							interested
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
