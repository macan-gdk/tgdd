import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Header from './components/header/HeaderComponent.js';
import LeftMenu from './components/body/leftLayout/LeftMenuComponent.js';
import MainBody from '../route/router.js';


export default class RenderingMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			token: localStorage.token
		}
	}
	
	setToken = () => {
		const token = localStorage.token;
		this.setState({token})
	}

	removeToken = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("id")
		localStorage.removeItem("role")
		this.setState({token: null})
	}

	render()
	{
		return (
			<React.Fragment>
				<Header token={this.state.token} setToken={this.setToken} removeToken={this.removeToken}/>
				<Layout>
					<LeftMenu />
					<Layout style={{ padding: '0 24px 24px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}/>
						<MainBody />
					</Layout>
				</Layout>
			</React.Fragment>
		)
	}
}