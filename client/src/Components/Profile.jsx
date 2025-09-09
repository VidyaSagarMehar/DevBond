import React from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
	const user = useSelector((store) => store.user.data); // ← Fixed selector

	console.log('Profile user data:', user);

	return (
		user && (
			<div>
				<EditProfile user={user} />
			</div>
		)
	);
};

export default Profile;
