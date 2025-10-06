import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSocketConnection } from '../utils/socket';

const Chat = () => {
	const { targetUserId } = useParams();
	const [messages, setMessages] = useState([{ text: 'Hello world' }]);
	const [newMessage, setNewMessage] = useState('');
	const user = useSelector((store) => store.user);
	const userId = user?.data?._id; //loggedIn User Id from Redux store
	const firstName = user?.data?.firstName;

	useEffect(() => {
		if (!userId || !targetUserId) {
			return;
		}

		const socket = createSocketConnection();
		// As soon as the page loaded, the socket connection is made and joinChat event is emitted
		socket.emit('joinChat', { firstName, userId, targetUserId });

		// as soon as compomnent unloads - diconnect the socket
		return () => {
			socket.disconnect();
		};
	}, [userId, targetUserId]);

	const sendMessage = () => {
		const socket = createSocketConnection();
		socket.emit('sendMessage', {
			firstName,
			userId,
			targetUserId,
			text: newMessage,
		});
	};

	// Prevent rendering chat UI before userId is ready
	if (!userId) {
		return <div className="text-center p-5">Loading chat...</div>;
	}

	return (
		<div className="text-black w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
			<h1 className="p-5  border-b border-gray-600">Chat</h1>
			<div className="flex-1 overflow-scroll p-5">
				{/* Dispaly Messages*/}
				{messages.map((msg, index) => {
					return (
						<div key={index} className="chat chat-start">
							<div className="chat-header">
								Vidya Sagar
								<time className="text-xs opacity-50">2 hours ago</time>
							</div>
							<div className="chat-bubble">You were the chosen one </div>
							<div className="chat-footer opacity-50">seen</div>
						</div>
					);
				})}
			</div>
			<div className="p-5 border border-t border-gray-600 flex items-center">
				<input
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					type="text"
					className="outline flex-1 border-gray-500 text-black"
				/>
				<button onClick={sendMessage} className="btn btn-secondary m-2">
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
