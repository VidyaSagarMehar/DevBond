import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
	const [emailId, setEmailId] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				'http://localhost:7777/login',
				{
					emailId,
					password,
				},
				{ withCredentials: true },
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex justify-center my-10">
			<div className="card w-96 bg-base-300 shadow-sm">
				<div className="card-body">
					<div className="flex justify-between">
						<h2 className="text-3xl font-bold">Login</h2>
					</div>
					<div>
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
					<div className="mt-6">
						<button onClick={handleLogin} className="btn btn-primary btn-block">
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
