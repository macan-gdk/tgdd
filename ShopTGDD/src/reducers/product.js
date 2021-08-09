import {PRODUCT_LOAD_BY_CAT, TOTAL_PRODUCT_BY_CAT, UP_VIEW, 
	LOAD_BY_SEARCH
} from '../action/product';

const initialState = {
	productsByCat: [],
	totalProductByCat: 0,
	productsBySearch: [],
}

export default (state = initialState, action) => {
	switch(action.type) {
		case PRODUCT_LOAD_BY_CAT:
			return {
				...state,
				productsByCat: action.payload
			}
		case TOTAL_PRODUCT_BY_CAT:
			return {
				...state,
				totalProductByCat: action.payload
			}
		case UP_VIEW:
			let products = state.productsByCat.map(p => {
				if (action.id !== p.masanpham) {
					return p;
				}
				return {
					...p,
					luotxem: parseInt(p.luotxem, 10) + 1
				}
			});
			let productsBySearch = state.productsBySearch.map(p => {
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
				productsByCat: products,
				productsBySearch
			}
		case LOAD_BY_SEARCH:
			return {
				...state,
				productsBySearch: action.payload
			}
		default:
			return state;
	}
}