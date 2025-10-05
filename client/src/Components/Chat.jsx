import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
	const { targetUserId } = useParams();

	const [messages, setMessages] = useState([{ text: 'Hello world' }]);

	console.log(targetUserId);
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
					type="text"
					className="outline flex-1 border-gray-500 text-black"
				/>
				<button className="btn btn-secondary m-2">Send</button>
			</div>
		</div>
	);
};

export default Chat;
