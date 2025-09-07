import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
	const requests = useSelector((store) => store.requests);
	const dispatch = useDispatch();

	const reviewRequest = async (status, _id) => {
		try {
			const res = await axios.post(
				BASE_URL + '/request/review/' + status + '/' + _id,
				{},
				{ withCredentials: true },
			);
			dispatch(removeRequest(_id));
			// TODO: TOASTIFY success to be added
		} catch (err) {
			console.log(err.message);
		}
	};

	const fetchRequest = async () => {
		try {
			const res = await axios.get(BASE_URL + '/user/requests/received', {
				withCredentials: true,
			});
			dispatch(addRequests(res.data.data));
		} catch (err) {
			// TODO: Toastify
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchRequest();
	}, []);

	if (!requests) return;
	if (requests.length === 0)
		return <h1 className="font-bold text-xl">No Request Found</h1>;

	return (
		<div className="text-center my-10">
			<h1 className="font-bold text-xl">Connections Requests</h1>
			{requests.map((request) => {
				const { _id, firstName, lastName, photoUrl, gender, age, about } =
					request.fromUserId;
				return (
					<div
						key={_id}
						className="flex m-4 p-4 rounded-lg bg-base w-1/2 bg-base-300 mx-auto"
					>
						<div>
							<img
								className="w-20 h-20 rounded-full"
								src={photoUrl}
								alt="Profile photo"
							/>
						</div>
						<div className="text-left mx-4">
							<h2 className="font-bold text-2xl">
								{firstName + ' ' + lastName}
							</h2>
							{age && gender && <p>{age + ', ' + gender}</p>}
							<p>{about}</p>
						</div>
						<div className="flex justify-between mx-2 items-center">
							<button
								onClick={() => reviewRequest('rejected', request._id)}
								className="btn btn-primary m-2"
							>
								Reject
							</button>
							<button
								onClick={() => reviewRequest('accepted', request._id)}
								className="btn btn-secondary"
							>
								Accept
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Requests;
