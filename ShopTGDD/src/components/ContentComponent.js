import React from 'react';
import { Route, Switch } from "react-router-dom";
import {Layout} from 'antd';
import Main from './SubContentComponents/MainPage';
import AccountManagement from './SubContentComponents/AccountManagementPage';
import Cart from './SubContentComponents/Cart';
import Search from './SubContentComponents/Search';
import History from './SubContentComponents/OrdersHistory';
import ProductByCat from './SubContentComponents/ProductByCatPage';
const {Content} = Layout;
const NotFound = () => (
	<div style={{textAlign: 'center'}}>
		<img src="./pagenotfound.png" alt="notfound"/>
	</div>
);

const ContentComponent = () => (
	<Content id="content">
		<Switch>
			<Route exact path="/" component={Main} />
			<Route exact path="/account" component={AccountManagement} />
			<Route exact path="/cart" component={Cart} />
			<Route exact path="/category" component={ProductByCat}/>
			<Route exact path="/search" component={Search} />
			<Route exact path="/history" component={History} />
			<Route component={NotFound} />
		</Switch>
	</Content>
);

export default ContentComponent;