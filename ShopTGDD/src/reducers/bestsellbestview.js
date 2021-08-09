import {
	LOAD_BESTSELL, 
	LOAD_BESTVIEW
} from '../action/bestsellbestview';
import {
	UP_VIEW
} from '../action/product';

const initialState = {
	bestsell: [],
	bestview: []
}

export default (state = initialState, action) => {
	switch(action.type) {
		case LOAD_BESTSELL:
			return {
				...state,
				bestsell: action.payload
			}
		case LOAD_BESTVIEW:
			return {
				...state,
				bestview: action.payload
			}
		case UP_VIEW:
			let bestsell = state.bestsell.map(p => {
				if (action.id !== p.masanpham) {
					return p;
				}
				return {
					...p,
					luotxem: parseInt(p.luotxem, 10) + 1
				}
			});
			let bestview = state.bestview.map(p => {
				if (action.id !== p.masanpham) {
					return p;
				}
				return {
					...p,
					luotxem: parseInt(p.luotxem, 10) + 1
				}
			});
			return {
				...state,
				bestsell,
				bestview
			}
		default:
			return state;
	}
}