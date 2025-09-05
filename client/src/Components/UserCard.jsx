import React, { use } from 'react';

const UserCard = ({ user }) => {
	const { firstName, lastName, photoUrl, about, age, gender } = user;
	return (
		<div>
			<div className="card bg-base-100 w-96 shadow-sm">
				<figure>
					<img src={user.photoUrl} alt="Profile Image" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">{firstName + ' ' + lastName}</h2>
					{age && gender && <p>{age + ' ' + gender}</p>}
					<p>{about}</p>
					<div className="card-actions justify-center">
						<button className="btn btn-primary">Ignore</button>
						<button className="btn btn-secondary">interested</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
