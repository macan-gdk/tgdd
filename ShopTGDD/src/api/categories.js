import axios from 'axios';
import url from '../urlBackend';
import {loadAction}
	from '../action/categories';

export const loadCategories = dispatch => {
	axios.get(`${url}/loaisanpham`)
		.then(res => {
			dispatch(loadAction(res.data));
		})
		.catch(err => {
			console.log(err);
		})
}