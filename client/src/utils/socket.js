import { io } from 'socket.io-client';

export const createSocketConnection = () => {
	const URL = import.meta.env.VITE_BASE_URL || 'http://localhost:7777';

	return io(URL, {
		withCredentials: true,
		transports: ['websocket'],
	});
};
