import React from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
	const user = useSelector((store) => store.user.data);

	return (
		user && (
			<div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md transition-colors">
				<EditProfile user={user} />
			</div>
		)
	);
};

export default Profile;
