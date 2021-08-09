import {combineReducers} from 'redux';
import userReducer from './reducers/user';
import categoriesReducer from './reducers/categories';
import bestsellbestviewReducer from './reducers/bestsellbestview';
import productsReducer from './reducers/product';
import commentReducer from './reducers/comment';
export default combineReducers({
	user: userReducer,
	categories: categoriesReducer,
	bestsellbestview: bestsellbestviewReducer,
	products: productsReducer,
	comment: commentReducer
});