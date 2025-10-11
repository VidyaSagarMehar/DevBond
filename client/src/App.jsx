import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import appStore from './utils/appStore';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Feed from './Components/Feed';
import Connections from './Components/Connections';
import Requests from './Components/Requests';
import { Toaster } from 'react-hot-toast';
import Premium from './Components/Premium';
import Chat from './Components/Chat';
import LandingPage from './Components/LandingPage';

function App() {
	return (
		<Provider store={appStore}>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
				<BrowserRouter>
					<AnimatePresence mode="wait">
						<Routes>
							<Route path="/" element={<Body />}>
								<Route index element={<Feed />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/connections" element={<Connections />} />
								<Route path="/requests" element={<Requests />} />
								<Route path="/premium" element={<Premium />} />
								<Route path="/chat/:targetUserId" element={<Chat />} />
							</Route>
							<Route path="/welcome" element={<LandingPage />} />
							<Route path="/login" element={<Login />} />
						</Routes>
					</AnimatePresence>
				</BrowserRouter>
				<Toaster position="top-right" />
			</div>
		</Provider>
	);
}

export default App;
