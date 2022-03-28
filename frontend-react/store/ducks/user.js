import { Constants } from '../../helpers/constants';
import { HYDRATE } from "next-redux-wrapper";
import axios from 'axios';

// Action Types

export const Types = {
	USER_LOGGED_IN: 'USER_LOGGED_IN',
	USER_LOGGED_OUT: 'USER_LOGGED_OUT',
	UPDATE_USER: 'UPDATE_USER',
};

// Reducer 

const initialState = {};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.user };
		case Types.UPDATE_USER:
			return { ...state, ...action.payload };
		case Types.USER_LOGGED_IN:
			return action.payload;
		case Types.USER_LOGGED_OUT:
			return {
				...initialState,
			};
		default:
			return state;
	}
}

// Action Creators

export const updateUser = user => {
	return {
		type: Types.UPDATE_USER,
		payload: user
	};
};

export const userLogged = user => {
	return {
		type: Types.USER_LOGGED_IN,
		payload: user
	};
};

export const setLogout = () => {
	return {
		type: Types.USER_LOGGED_OUT
	};
};

// Actions and API calls

export const login = data => {
	return axios.post(`${Constants.baseUrl}/login`, data);
};

export const register = user => {
	return axios.post(`${Constants.baseUrl}/register`, user);
};

export const update = data => {
	return axios.post(`${Constants.baseUrl}/update`, data);
};