import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
	const [emailId, setEmailId] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [error, setError] = useState('');
	const [isLoginForm, setIsLoginForm] = useState(true); //To conditiaonally render login/signup form
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + '/login',
				{
					emailId,
					password,
				},
				{ withCredentials: true },
			);
			dispatch(addUser(res.data)); //dispatching the user data to be stored in store
			return navigate('/');
		} catch (err) {
			setError(err?.response?.data?.message || 'Something went wrong');
		}
	};

	const handleSignup = async () => {
		try {
			const res = await axios.post(
				BASE_URL + '/signup',
				{
					firstName,
					lastName,
					emailId,
					password,
				},
				{ withCredentials: true },
			);
			dispatch(addUser(res.data.data)); //dispatching the user data to be stored in store
			return navigate('/profile');
		} catch (err) {
			setError(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return (
		<div className="flex justify-center my-10">
			<div className="card w-96 bg-base-300 shadow-sm">
				<div className="card-body">
					<div className="flex justify-between">
						<h2 className="text-3xl font-bold">
							{isLoginForm ? 'Login' : 'Sign Up'}
						</h2>
					</div>
					<div>
						{!isLoginForm && (
							<div>
								<fieldset className="fieldset">
									<legend className="fieldset-legend">First Name</legend>
									<input
										type="text"
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
							</div>
						)}
						<fieldset className="fieldset">
							<legend className="fieldset-legend">Email Id</legend>
							<input
								type="email"
								value={emailId}
								onChange={(e) => setEmailId(e.target.value)}
								className="input"
							/>
						</fieldset>
						<fieldset className="fieldset">
							<legend className="fieldset-legend">Password</legend>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="input"
							/>
						</fieldset>
					</div>
					<p className="text-red-500">{error}</p>
					<div className="mt-6">
						<button
							onClick={isLoginForm ? handleLogin : handleSignup}
							className="btn btn-primary btn-block"
						>
							{isLoginForm ? 'Login' : 'Sign Up'}
						</button>
					</div>
					<p
						onClick={() => setIsLoginForm((value) => !value)}
						className="text-gray-300 cursor-pointer"
					>
						{isLoginForm ? 'New User Sign Up Here' : 'Existing User Logn Here'}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
