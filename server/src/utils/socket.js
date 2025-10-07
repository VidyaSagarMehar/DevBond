const socket = require('socket.io');
const crypto = require('crypto');
const { Chat } = require('../models/chat');

// Creating encrypted room id
const getSecretRoomId = (userId, targetUserId) => {
	return crypto
		.createHash('sha256')
		.update([userId, targetUserId].sort().join('_'))
		.digest('hex');
};

const initializeSocket = (server) => {
	const io = socket(server, {
		cors: {
			origin: 'http://localhost:5173',
		},
	});
	// Accept connection
	io.on('connection', (socket) => {
		// Handle Events
		socket.on('joinChat', ({ firstName, userId, targetUserId }) => {
			const roomId = getSecretRoomId(userId, targetUserId);

			console.log(firstName + ' Joined Room : ' + roomId);

			socket.join(roomId);
		});
		socket.on(
			'sendMessage',
			async ({ firstName, lastName, userId, targetUserId, text }) => {
				// Save messages to the database
				try {
					const roomId = getSecretRoomId(userId, targetUserId);
					console.log(firstName + ' ' + text);

					let chat = await Chat.findOne({
						participants: { $all: [userId, targetUserId] },
					});
					// If the chat is happeing for the first time
					if (!chat) {
						chat = new Chat({
							participants: [userId, targetUserId],
							messages: [],
						});
					}

					chat.messages.push({
						senderId: userId,
						text,
					});

					await chat.save();
					io.to(roomId).emit('messageRecieved', { firstName, lastName, text });
				} catch (err) {
					console.log(err.message);
				}
			},
		);
		socket.on('disconnect', () => {});
	});
};

module.exports = initializeSocket;
