import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

const Chat = () => {
	const { targetUserId } = useParams();
	const user = useSelector((store) => store.user.data);
	const userId = user?._id;
	const firstName = user?.firstName || '';
	const lastName = user?.lastName || '';

	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [loading, setLoading] = useState(true);

	// persistent socket ref (single connection)
	const socketRef = useRef(null);
	// ref to scroll to bottom
	const bottomRef = useRef(null);

	// Fetch chat messages for this conversation
	const fetchChatMessages = async () => {
		try {
			setLoading(true);
			const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
				withCredentials: true,
			});
			// expected shape: res.data.messages = [{ senderId: {...}, text }]
			const chatMessages = (res.data?.messages || []).map((msg) => {
				const { senderId, text } = msg;
				return {
					firstName: senderId?.firstName,
					lastName: senderId?.lastName,
					text,
				};
			});
			setMessages(chatMessages);
		} catch (err) {
			toast.error('Failed to load messages');
			console.error(err);
		} finally {
			setLoading(false);
			// scroll after load
			setTimeout(
				() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
				50,
			);
		}
	};

	// initialize socket once per component mount (and when userId/targetUserId become available)
	useEffect(() => {
		if (!userId || !targetUserId) return;

		// create or reuse socket
		if (!socketRef.current) {
			socketRef.current = createSocketConnection();
		}
		const socket = socketRef.current;

		// join the chat room (your original event)
		socket.emit('joinChat', { firstName, userId, targetUserId });

		// listen for incoming messages (your original event)
		socket.on(
			'messageRecieved',
			({ firstName: sFirst, lastName: sLast, text }) => {
				setMessages((prev) => [
					...prev,
					{ firstName: sFirst, lastName: sLast, text },
				]);
				// auto-scroll
				setTimeout(
					() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
					50,
				);
			},
		);

		// cleanup on unmount
		return () => {
			// remove listener for this component
			socket.off('messageRecieved');
			// do not disconnect socket globally here if other components rely on it;
			// but if this socket is only used here and you want to close it on unmount, uncomment:
			// socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, targetUserId]);

	useEffect(() => {
		if (userId && targetUserId) {
			fetchChatMessages();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, targetUserId]);

	const sendMessage = () => {
		const text = newMessage?.trim();
		if (!text) return;

		// optimistic UI - append right away
		setMessages((prev) => [...prev, { firstName, lastName, text }]);
		setNewMessage('');

		// emit via existing socket connection (do NOT create a new socket)
		const socket = socketRef.current || createSocketConnection();
		socket.emit('sendMessage', {
			firstName,
			lastName,
			userId,
			targetUserId,
			text,
		});
	};

	if (loading) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-3xl h-[80vh] flex flex-col bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
						{targetUserId?.slice(0, 2)?.toUpperCase() || 'U'}
					</div>
					<div>
						<div className="font-semibold">Chat</div>
						<div className="text-xs opacity-80">Conversation</div>
					</div>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-br from-slate-50 to-white space-y-3">
				{messages.length === 0 ? (
					<div className="text-center text-gray-400 mt-8">
						No messages yet. Say hi 👋
					</div>
				) : (
					messages.map((msg, idx) => {
						const isMine =
							msg.firstName === user?.firstName &&
							msg.lastName === user?.lastName;
						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
							>
								<div
									className={`max-w-[78%] px-4 py-2 rounded-2xl shadow-sm ${
										isMine
											? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none'
											: 'bg-gray-100 text-gray-800 rounded-bl-none'
									}`}
								>
									<div className="text-sm">{msg.text}</div>
									<div className="text-[10px] opacity-60 mt-1 text-right">
										{isMine
											? 'You'
											: `${msg.firstName || 'User'} ${msg.lastName || ''}`}
									</div>
								</div>
							</motion.div>
						);
					})
				)}
				<div ref={bottomRef} />
			</div>

			{/* Input */}
			<div className="px-4 py-3 border-t border-gray-200 flex items-center gap-3 bg-white">
				<input
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') sendMessage();
					}}
					placeholder="Type a message..."
					className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
				/>
				<button
					onClick={sendMessage}
					className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition"
					aria-label="Send message"
				>
					<Send className="w-4 h-4" />
					<span className="hidden sm:inline">Send</span>
				</button>
			</div>
		</div>
	);
};

export default Chat;
