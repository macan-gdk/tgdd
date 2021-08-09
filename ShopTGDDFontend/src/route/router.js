import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeBody from '../layout/components/body/rightLayout/HomeComponent';
import UserDetailBody from '../layout/components/body/rightLayout/UserDetailComponent';
import ProducerBody from '../layout/components/body/rightLayout/ProducerComponent';
import ProductBody from '../layout/components/body/rightLayout/ProductComponent';
import UserBody from '../layout/components/body/rightLayout/UserComponent';
import StatisticBody from '../layout/components/body/rightLayout/StatisticComponent';
import OrderBody from '../layout/components/body/rightLayout/OrderComponent';
// Component
const NotFound = () => (
	<div>
		<h2>Not Found 404</h2>
	</div>
);


const RouterURL = () => (
	<Switch>
		<Route exact path="/" component={HomeBody} />
		<Route exact path="/product" component={ProductBody} />
		<Route exact path="/producer" component={ProducerBody} />
		<Route exact path="/user" component={UserBody} />
		<Route exact path="/detail" component={UserDetailBody} />
		<Route exact path="/statistic" component={StatisticBody} />
		<Route exact path="/orders" component={OrderBody} />
		<Route component={NotFound} />
	</Switch>
);

export default RouterURL;
