import React from 'react';
import {Layout, Table, Menu, Dropdown, Button, Icon, Modal} from 'antd';
import urlConfig from '../../../../route/urlConfig';
import {Redirect} from 'react-router-dom';
const {Content} = Layout;
const url = `${urlConfig}/api/donhang`;
const detailUrl = `${urlConfig}/api/ctdonhang`;
const productUrl = `${urlConfig}/api/sanpham`;

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
		fetch(url, {
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

	updateState = (e) => {
		const donHang = e.item.props.id;
		donHang.tinhtrang = e.item.props.index;
		const {order, orders} = this.state;
		fetch(`${url}/${donHang.madonhang}`, {
  			method: 'PUT', 
  			headers: {
  				'Content-Type': 'application/json',
  				Authorization: `Bearer ${localStorage.token}`,
  			},
  			body: JSON.stringify(donHang),
  		})
		.then(res => res.json())
		.then(() => this.setState({
				orders: orders.map(o => {
					if (o.madonhang !== order.madonhang) {
						o.tinhtrang = (o.tinhtrang === 0 || o.tinhtrang === "Chưa giao") ? "Chưa giao" : (o.tinhtrang === 1 || o.tinhtrang === "Đang giao") ? "Đang giao" : "Đã giao"
						return o
					}
					else
						return order
				}),
				order: {}
			}))
			.catch(err => console.log(err));
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
			title: 'ID',
			dataIndex: 'masanpham',
			key: 'masanpham'
		}, {
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
			title: 'ID',
			dataIndex: 'madonhang',
			key: 'madonhang',
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
		}, {
			title: 'Action',
			dataIndex: '',
			key: 'x',
			render: (text, record) => {
				return (
					this.state.orders.length > 0 ?
					(
						<React.Fragment>
							<Dropdown overlay={
								<Menu>
								    <Menu.Item id={record} onClick={this.updateState}>Chưa giao</Menu.Item>
								    <Menu.Item id={record} onClick={this.updateState}>Đang giao</Menu.Item>
								    <Menu.Item id={record} onClick={this.updateState}>Đã giao</Menu.Item>
								</Menu>
							} placement="bottomCenter">
						      <Button><Icon type="bars" stye="margin-right: 2px"/><Icon type="down"/></Button>
						    </Dropdown>
						</React.Fragment>
					) : null
					);
			},
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