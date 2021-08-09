import React from 'react';
import {Layout, Table, Popconfirm, Divider, Modal, Input, Select, message} from 'antd';
import urlConfig from '../../../../route/urlConfig';
import {Redirect} from 'react-router-dom';
const {Content} = Layout;
const {Option} = Select;
const url = `${urlConfig}/api/user`;

export default class User extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [],
			visible: false,
			user: {},
		}
	}
	componentDidMount() {
		fetch(url, {
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
			}
		})
		.then(res => res.json())
		.then(data => {
			data.map(element => element.key = element.id);
			this.setState({users: data});
		})
		.catch(err => console.log(err))
	}

	onDelete = (key) => {
		if (key.toString() === localStorage.id.toString()) {
			message.error('Do not remove current user!');
		}
		else {
			fetch(`${url}/${key}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.token}`,
				}
			})
			.then(res => res.json())
			.then(data => {
				const {users} = this.state;
				this.setState({ users: users.filter(item => item.key !== key) });
			})
			.catch(err => console.log(err))	
		}
	}
    beforeUpdate = (record) => {
    	let user = {
    		id: record.id,
    		email: record.email,
    		firstname: record.firstname,
    		lastname: record.lastname,
    		address: record.address,
    		phone: record.phone,
    		role: record.role,
    		createat: record.createat,
    		key: record.id
    	}
    	this.setState({...this.state,visible:true, user: user})
    }
	handleOk = () => {
		const {user, users} = this.state;
		if (user.firstname.trim().length === 0) {
			message.error('Firstname is needed to show his/her name!');
		}
		else {
	  		fetch(`${url}/${user.id}`, {
	  			method: 'PUT', 
	  			headers: {
	  				'Content-Type': 'application/json',
	  				Authorization: `Bearer ${localStorage.token}`,
	  			},
	  			body: JSON.stringify(user),
	  		})
			.then(res => res.json())
			.then(item => this.setState({
				users: users.map(u => {if (u.id !== user.id) return u; return user}),
				visible: false,
				user: {}
			}))
			.catch(err => console.log(err));
		}
	}
	handleCancel = () => {
		this.setState({visible:false})
	}
	onChangeFirstname = (e) => {
		this.setState({...this.state, user: {...this.state.user, firstname: e.target.value}})
	}
	onChangeLastname = (e) => {
		this.setState({...this.state, user: {...this.state.user, lastname: e.target.value}})
	}
	onChangeAddress = (e) => {
		this.setState({...this.state, user: {...this.state.user, address: e.target.value}})
	}
	onChangePhone = (e) => {
		this.setState({...this.state, user: {...this.state.user, phone: e.target.value}})
	}
	onChangeRole = (value) => {
		this.setState({...this.state, user: {...this.state.user, role: value}})
	}
	render() {
		const token = localStorage.token;
		if (!token) {
			return <Redirect to="/" />
		}
		const columns = [{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		}, {
			title: 'FirstName',
			dataIndex: 'firstname',
			key: 'firstname'
		}, {
			title: 'LastName',
			dataIndex: 'lastname',
			key: 'lastname'
		}, {
			title: 'Address',
			dataIndex: 'address',
			key: 'address'
		}, {
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone'
		}, {
			title: 'Action',
			dataIndex: '',
			key: 'x',
			render: (text, record) => {
				return (
					this.state.users.length > 0 ?
					(
						<React.Fragment>
							<a onClick={() => this.beforeUpdate(record)}>Update</a>
							<Divider type="vertical" />
							<Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
								<a>Delete</a>
							</Popconfirm>
						</React.Fragment>
					) : null
					);
			},
		}]

		return (	
			<React.Fragment>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
					<Table dataSource={this.state.users} columns={columns} />
				</Content>

				<Modal
			          title={'Update user'}
			          visible={this.state.visible}
			          onOk={this.handleOk}
			          onCancel={this.handleCancel}
			        >
				        <div>
				          ID
				          <Input style={{width: '75%', marginLeft: '12.2%'}} 
				          		 placeholder="Please input name" 
				          		 type="text"
				          		 value={this.state.user.id}
				          		 disabled
				           />
				        </div>
				        <div>
				          Email
				          <Input style={{width: '75%', marginLeft: '8%'}} 
				          		 placeholder="Please input email" 
				          		 type="text"
				          		 value={this.state.user.email}
				          		 disabled
				           />
				        </div>
				        <div>
				          Firstname
				          <Input style={{width: '75%', marginLeft: '2.2%'}} 
				          		 placeholder="Please input firstname" 
				          		 type="text"
				          		 value={this.state.user.firstname}
				          		 onChange={this.onChangeFirstname}
				           />
				        </div>
				        <div>
				          Lastname
				          <Input style={{width: '75%', marginLeft: '2.6%'}} 
				          		 placeholder="Please input lastname" 
				          		 type="text"
				          		 value={this.state.user.lastname}
				          		 onChange={this.onChangeLastname}
				           />
				        </div>
				        <div>
				          Address
				          <Input style={{width: '75%', marginLeft: '4.6%'}} 
				          		 placeholder="Please input address" 
				          		 type="text"
				          		 value={this.state.user.address}
				          		 onChange={this.onChangeAddress}
				           />
				        </div>
				        <div>
				          Phone
				          <Input style={{width: '75%', marginLeft: '6.8%'}} 
				          		 placeholder="Please input phone" 
				          		 type="text"
				          		 value={this.state.user.phone}
				          		 onChange={this.onChangePhone}
				           />
				        </div>
				        <div>
				          Role
				          <Select defaultValue={'' + this.state.user.role} 
				          		  style={{width: '75%', marginLeft: '9.4%'}}
				          		  onChange={this.onChangeRole}>
				          	<Option value="1" key="1">Admin</Option>
				          	<Option value="0" key="0">Normal</Option>
				          </Select>
				        </div>
				        <div>
				          Create at
				          <Input style={{width: '75%', marginLeft: '3.3%'}} 
				          		 placeholder="Please input create at" 
				          		 type="text"
				          		 value={this.state.user.createat}
				          		 disabled
				           />
				        </div>
			    </Modal>
		    </React.Fragment>
		)
	}
}