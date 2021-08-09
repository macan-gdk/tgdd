import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import Header from './components/HeaderComponent';
import Content from './components/ContentComponent';
import Footer from './components/FooterComponent';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import store from './storeReducer';

class App extends React.Component {
	render() {
		return (
		  <BrowserRouter>
		  <React.Fragment>
		  	<Header />
		  	<Content />
		  	<Footer />
		  </React.Fragment>
		  </BrowserRouter>
		);
	}
}

ReactDOM.render(<Provider store={createStore(store)}>
				  <App />
				</Provider>, document.getElementById('root'));