import React from 'react';
import {Layout, Table, Button, Icon, Modal} from 'antd';
import urlConfig from '../../urlBackend';
import {Redirect} from 'react-router-dom';
const {Content} = Layout;
const url = `${urlConfig}/donhang`;
const detailUrl = `${urlConfig}/ctdonhang`;
const productUrl = `${urlConfig}/sanpham`;

export default class User extends React.Component {
	constructor() {
		super();
		this.state = {
			orders: [],
			order: {},
			visible: false,
			orderDetails: []
		}
	}
	componentDidMount() {
		const email = localStorage.email
		fetch(`${url}/${email}`, {
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
			}
		})
		.then(res => res.json())
		.then(data => {
			data.forEach(element => {var date = new Date(element.ngaydat); element.ngaydat = date.toLocaleDateString()});
			data.map(element => element.tongtien = element.tongtien.toLocaleString());
			data.map(element => element.key = element.madonhang);
			data.map(element => element.tinhtrang = (element.tinhtrang === 0 ? "Chưa giao" : (element.tinhtrang === 1) ? "Đang giao" : "Đã giao"));
			this.setState({orders: data});
		})
		.catch(err => console.log(err))
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	handleCancel = () => {
		this.setState({
			visible: false,
			orderDetails: []
		});

	}

	orderDetails = (e) => {
		const madh = e.madonhang
		fetch(`${detailUrl}/${madh}`, {
			headers: {
  				Authorization: `Bearer ${localStorage.token}`,
  			},
		})
		.then(res => res.json())
		.then(data => {
			if(data.length===0) {
				this.showModal()
				return
			}
			
			data.map(element => element.key = `${element.madonhang}_${element.masanpham}`);
			data.map(element => element.dongia = element.dongia.toLocaleString());

			for(let i=0; i<data.length; i++) {
				fetch(`${productUrl}/${data[i].masanpham}`, {
					headers: {
		  				Authorization: `Bearer ${localStorage.token}`,
		  			},
				})
				.then(res => res.json())
				.then(item => {
					data[i].name = item[0].tensanpham;
					this.setState({
						orderDetails: data
					})
					
				})
				.catch(err => console.log(err));
			}
			this.showModal()
		})
		.catch(err => console.log(err));
	}

	render() {
		const token = localStorage.token;
		if (!token) {
			return <Redirect to="/" />
		}

		const detailColumns = [{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		}, {
			title: 'Price',
			dataIndex: 'dongia',
			key: 'dongia'
		}, {
			title: 'Amount',
			dataIndex: 'soluong',
			key: 'soluong'
		}]

		const columns = [{
			title: 'Details',
			dataIndex: '',
			key: 'icon',
			render: (text) => {
				return (
					<Button user={text} onClick={this.orderDetails.bind(this, text)}><Icon type="eye" style={{ fontSize: 16 }} /></Button>
				)
			}
		}, {
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		}, {
			title: 'Order Date',
			dataIndex: 'ngaydat',
			key: 'ngaydat'
		}, {
			title: 'Address',
			dataIndex: 'diachigiaohang',
			key: 'diachigiaohang'
		}, {
			title: 'Phone',
			dataIndex: 'sdt',
			key: 'sdt'
		}, {
			title: 'Total',
			dataIndex: 'tongtien',
			key: 'tongtien'
		}, {
			title: 'Status',
			dataIndex: 'tinhtrang',
			key: 'tinhtrang'
		}]

		return (	
			<React.Fragment>
				<Modal
		          title={'Order Details'}
		          visible={this.state.visible}
		          onCancel={this.handleCancel}
		          footer={[
		            <Button key="back" onClick={this.handleCancel}>Back</Button>,
		          ]}
		        >
		        	<Table pagination={false} dataSource={this.state.orderDetails} columns={detailColumns} />
		        </Modal>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
					<Table dataSource={this.state.orders} columns={columns} />
				</Content>
		    </React.Fragment>
		)
	}
}