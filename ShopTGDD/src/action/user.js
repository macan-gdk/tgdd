


export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const FORGOT = 'FORGOT';
export const UPDATE = 'UPDATE';

export const loginAction = payload => ({
	type: LOGIN,
	payload
})

export const logoutAction = () => ({
	type: LOGOUT
})

export const registerAction = () => ({
	type: REGISTER
})

export const forgotAction = () => ({
	type: FORGOT
})

export const updateAction = payload => ({
	type: UPDATE,
	payload
})