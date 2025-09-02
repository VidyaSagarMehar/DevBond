import React from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {
	return (
		<>
			{/* <NavBar /> */}
			<BrowserRouter basename="/">
				<Routes>
					<Route path="/" element={<Body />}>
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
