import {
	loadCommentForProductAction, createCommentAction
} from '../action/comment';
import axios from 'axios';
import url from '../urlBackend';
import moment from 'moment';

export const loadCommentForProduct = (dispatch, productId, limit = true) => {
	var loadUrl = `${url}/comment/${productId}`;
	if (limit) {
		loadUrl += '?limit=1';
	}
	axios.get(loadUrl)
		 .then(res => {
		 	dispatch(loadCommentForProductAction(res.data));
		 })
		 .catch(err => console.log(err));
}

export const createComment = (dispatch, data) => {
	const time = moment().format();
	let body = {
		"id_product": data.id,
		"email_user": localStorage.email,
		"content": data.content,
		"time": time
	}
	axios.post(`${url}/comment`, body,
				{
					headers: {Authorization: "Bearer " + localStorage.token, ContentType: "application/json"}
				}).then(res => {
					body.id_comment = res.data.insertId;
					dispatch(createCommentAction(body));
				}).catch(err => console.log(err));
}