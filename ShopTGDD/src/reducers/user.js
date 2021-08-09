import {
	LOGIN, LOGOUT,
	REGISTER,
	FORGOT,
	UPDATE
} from '../action/user';

const initialState = {
	token: localStorage.token ? localStorage.token : null,
	role: localStorage.token ? localStorage.role : null,
	email: localStorage.token ? localStorage.email : null,
	firstname: localStorage.token ? localStorage.firstname : null,
	lastname: localStorage.token ? localStorage.lastname : null,
	id: localStorage.token ? localStorage.id : null,
	address: localStorage.token ? localStorage.address : null,
	phone: localStorage.token ? localStorage.phone : null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				token: action.payload.token,
				role: action.payload.role,
				email: action.payload.email,
				firstname: action.payload.firstname,
				lastname: action.payload.lastname,
				address: action.payload.address,
				phone: action.payload.phone,
				id: action.payload.id
			};
		case LOGOUT:
			return {
				token: null,
				role: null,
				email: null,
				firstname: null,
				lastname: null,
				address: null,
				phone: null,
				id: null,
			};
		
		case REGISTER:
			return {
				...state,
			}
		case FORGOT:
			return {
				...state,
			}
		case UPDATE:
			return {
				...state,
				firstname: action.payload.firstname,
				lastname: action.payload.lastname,
				address: action.payload.address,
				phone: action.payload.phone
			}
		default:
			return state;
	}
}