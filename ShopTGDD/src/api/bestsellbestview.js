import {
	loadBestSellAction, 
	loadBestViewAction
} from '../action/bestsellbestview';
import axios from 'axios';
import url from '../urlBackend';

export const loadBestSell = (dispatch) => {
	axios.get(`${url}/sanpham/top12`)
		.then(res => {
			dispatch(loadBestSellAction(res.data));
		})
		.catch(err => {
			console.log(err);
		})
}

export const loadBestView = (dispatch) => {
		axios.get(`${url}/sanpham/top12view`)
			.then(res => {
				dispatch(loadBestViewAction(res.data));
			})
			.catch(err => {
				console.log(err);
			})
}