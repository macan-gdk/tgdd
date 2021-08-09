import {productLoadByCatAction, totalProductByCatAction, upViewAction,
	loadBySearchAction
} from '../action/product';
import axios from 'axios';
import url from '../urlBackend';

export const productLoadByCat = (dispatch, id, page) => {
	axios.get(`${url}/sanpham/loaisanpham/${id}?page=${page}`)
		.then(res => {
			dispatch(productLoadByCatAction(res.data));
		})
		.catch(err => console.log(err));
}

export const totalProductByCat = (dispatch, id) => {
	axios.get(`${url}/sanpham/loaisanpham/${id}?page=0`)
		.then(res => {
			dispatch(totalProductByCatAction(res.data[0].total));
		})
		.catch(err => console.log(err));
}

export const upView = (dispatch, id) => {
	axios.put(`${url}/sanpham/upview/${id}`)
		.then(res => {
			dispatch(upViewAction(id));
		})
		.catch(err => console.log(err));	
}

export const loadBySearch = (dispatch, query, page = 1) => {
	axios.get(`${url}/search/${query}?page=${page}`)
		.then(res => {
			dispatch(loadBySearchAction(res.data));
		})
		.catch(err => console.log(err));	
}