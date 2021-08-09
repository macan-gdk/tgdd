import {
	LOAD
} from '../action/categories';
const initialState = {
	loaisanpham: [],
};

export default (state = initialState, action) => {
	switch(action.type) {
		case LOAD:
			return {
				loaisanpham: action.payload
			}
		default:
			return state;
	}
}