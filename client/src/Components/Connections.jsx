import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
	const connections = useSelector((store) => store.connections);
	const dispatch = useDispatch();

	const fetchConnections = async () => {
		try {
			const res = await axios.get(BASE_URL + '/user/connections', {
				withCredentials: true,
			});
			dispatch(addConnections(res.data.data));
		} catch (err) {
			// TODO: Toastify error
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchConnections();
	}, []);

	if (!connections) return;
	if (connections.length === 0)
		return <h1 className="font-bold text-xl">No Connections Found</h1>;

	return (
		<div className="text-center my-10">
			<h1 className="font-bold text-xl">Connections</h1>
			{connections.map((connection) => {
				const { firstName, lastName, photoUrl, gender, age, about } =
					connection;
				return (
					<div className="flex m-4 p-4 rounded-lg bg-base w-1/2 bg-base-300 mx-auto">
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
					</div>
				);
			})}
		</div>
	);
};

export default Connections;
