import axios from 'axios';
import url from '../urlBackend';
import {message} from 'antd';
import moment from 'moment';
import  {
	loginAction, logoutAction,
	registerAction,
	forgotAction,
	updateAction
} from '../action/user';

export const login = (dispatch, email, password, close) => {
	axios.post(`${url}/login`,{
		email,password
	}).then(res => {
		dispatch(loginAction(res.data));
		message.success('Đăng nhập thành công!');
		localStorage.setItem("token", res.data.token);
		localStorage.setItem("role", res.data.role);
		localStorage.setItem("email", res.data.email);
		localStorage.setItem("firstname", res.data.firstname);
		localStorage.setItem("lastname", res.data.lastname);
		localStorage.setItem("id", res.data.id);
		localStorage.setItem("address", res.data.address);
		localStorage.setItem("phone", res.data.phone);
		close();
	}).catch(err => {
		message.error('Email hoặc mật khẩu không đúng!');
	})
}

export const logout = (dispatch) => {
	dispatch(logoutAction());
	message.success('Đăng xuất thành công!');
	localStorage.removeItem("token");
	localStorage.removeItem("role");
	localStorage.removeItem("email");
	localStorage.removeItem("firstname");
	localStorage.removeItem("lastname");
	localStorage.removeItem("id");
	localStorage.removeItem("address");
	localStorage.removeItem("phone");
}

export const register = (dispatch, data, goLogin) => {
	axios.post(`${url}/user`,{
		email: data.email, 
		password: data.password, 
		firstname: data.firstname, 
		lastname: data.lastname,
		address: data.address,
		phone: data.phone,
		status: 1,
		createat: moment().format(),
		role: 0
	}).then(res => {
		dispatch(registerAction());
		message.success('Tạo tài khoản thành công!');
		goLogin();
	}).catch(err => {
		console.log(err);
	})
}

export const forgotPassword = (dispatch, email, closeModal) => {
	axios.post(`${url}/forgotpassword`,{
		email
	}).then(res => {
		dispatch(forgotAction());
		if (res.data.error) {
			message.error(res.data.error);
		}
		else {
			message.success(res.data.success);
			closeModal();
		}
	}).catch(err => {
		console.log(err);
	})
}

export const updateUser = (dispatch, data) => {
	axios.get(`${url}/user/${localStorage.id}`,
		{headers: {Authorization: "Bearer " + localStorage.token}})
		.then(res => {
			if (res.data[0].password !== data.oldpassword) {
				message.error('Mật khẩu cũ không đúng!');
				return;
			}
			else {
				axios.put(`${url}/user/${localStorage.id}`,{
						"email": res.data[0].email + "",
						"password": data.password + "",
						"firstname": data.firstname + "",
						"lastname": data.lastname + "",
						"address": data.address + "",
						"phone": data.phone + "",
						"role": res.data[0].role,
						"status": res.data[0].status,
						"createat": res.data[0].createat
					},
				{
					headers: {Authorization: "Bearer " + localStorage.token, ContentType: "application/json"}
				}).then(resUpdate => {
					if(resUpdate.data.affectedRows === 1) {
						message.success('Thành công!');
						dispatch(updateAction(data));
						localStorage.setItem("firstname", data.firstname);
						localStorage.setItem("lastname", data.lastname);
						localStorage.setItem("address", data.address);
						localStorage.setItem("phone", data.phone);
					}
					else {
						message.error('Lỗi!!!');
					}		
				}).catch(errUpdate => {
					console.log(errUpdate);
				})
			}
		}).catch(err => {
			console.log(err);
		})
}