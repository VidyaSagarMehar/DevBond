import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
	console.log(user);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [age, setAge] = useState(user.age);
	const [gender, setGender] = useState(user.gender);
	const [about, setAbout] = useState(user.about);
	const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const saveProfile = async () => {
		// Clear Error
		setError('');
		try {
			const res = await axios.patch(
				BASE_URL + '/profile/edit',
				{ firstName, lastName, photoUrl, gender, age, about },
				{ withCredentials: true },
			);
			// adding the updated data to redux store
			dispatch(addUser(res?.data?.data));
			// TODO: toastify msg data saved
		} catch (err) {
			// console.log(err.response.data.message);
			setError(err.response.data.message);
		}
	};

	return (
		<div className="flex justify-center my-10">
			<div className="flex justify-center mx-10">
				<div className="card w-96 bg-base-300 shadow-sm">
					<div className="card-body">
						<div className="flex justify-between">
							<h2 className="text-3xl font-bold">Edit Profile</h2>
						</div>
						<div>
							<fieldset className="fieldset">
								<legend className="fieldset-legend">First Name</legend>
								<input
									type="email"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="input"
								/>
							</fieldset>
							<fieldset className="fieldset">
								<legend className="fieldset-legend">Last Name</legend>
								<input
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="input"
								/>
							</fieldset>
							<fieldset className="fieldset">
								<legend className="fieldset-legend">Photo URL</legend>
								<input
									type="text"
									value={photoUrl}
									onChange={(e) => setPhotoUrl(e.target.value)}
									className="input"
								/>
							</fieldset>

							<fieldset className="fieldset">
								<legend className="fieldset-legend">Age</legend>
								<input
									type="text"
									value={age}
									onChange={(e) => setAge(e.target.value)}
									className="input"
								/>
							</fieldset>
							<fieldset className="fieldset">
								{/* TODO: Gender should eb a drop down */}
								<legend className="fieldset-legend">Gender</legend>
								<input
									type="text"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									className="input"
								/>
							</fieldset>
							<fieldset className="fieldset">
								{/* TODO: Add textArea */}
								<legend className="fieldset-legend">About</legend>
								<input
									type="text"
									value={about}
									onChange={(e) => setAbout(e.target.value)}
									className="input"
								/>
							</fieldset>
						</div>
						<p className="text-red-500">{error}</p>
						<div className="mt-6">
							<button
								onClick={saveProfile}
								className="btn btn-primary btn-block"
							>
								Save Profile
							</button>
						</div>
					</div>
				</div>
			</div>
			<UserCard user={{ firstName, lastName, photoUrl, gender, age, about }} />
		</div>
	);
};

export default EditProfile;
