
import {LOAD_COMMENT_FOR_PRODUCT, CREATE_COMMENT} from '../action/comment';

const initialState = {
	comment: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_COMMENT_FOR_PRODUCT:
			return {
				comment: action.payload
			};
		case CREATE_COMMENT:
			let newArray = [];
			newArray.push(action.payload);
			return {
				comment: newArray.concat(state.comment)
			};
		default:
			return state;
	}
}