import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
	const feed = useSelector((store) => store.feed);
	const dispatch = useDispatch();

	const getFeed = async () => {
		if (feed.length > 0) return;
		try {
			const res = await axios.get(BASE_URL + '/feed', {
				withCredentials: true,
			});
			dispatch(addFeed(res.data.data));
			console.log(res.data);
		} catch (err) {
			// TODO: error page
			console.error(err.message);
		}
	};
	useEffect(() => {
		getFeed();
	}, []);

	if (!feed || feed.length === 0) {
		return <h1>No new users found!</h1>;
	}

	return (
		feed && (
			<div className=" flex justify-center my-10">
				<UserCard user={feed[0]} />
			</div>
		)
	);
};

export default Feed;
