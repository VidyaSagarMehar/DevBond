import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		data: null,
		preferences: {
			theme: 'light',
			notifications: true,
			location: null,
		},
		stats: {
			connections: 0,
			matches: 0,
			profileViews: 0,
		},
	},
	reducers: {
		addUser: (state, action) => {
			state.data = action.payload;
		},
		removeUser: (state) => {
			state.data = null;
		},
		updateProfile: (state, action) => {
			state.data = { ...state.data, ...action.payload };
		},
		updatePreferences: (state, action) => {
			state.preferences = { ...state.preferences, ...action.payload };
		},
		updateStats: (state, action) => {
			state.stats = { ...state.stats, ...action.payload };
		},
	},
});

export const {
	addUser,
	removeUser,
	updateProfile,
	updatePreferences,
	updateStats,
} = userSlice.actions;
export default userSlice.reducer;
