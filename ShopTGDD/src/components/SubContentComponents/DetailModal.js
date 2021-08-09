import React from 'react';
import moment from 'moment';
import { Modal, Row, Col, Input, Button, Card, message, List, Avatar } from 'antd';
const {Meta} = Card;

export default class DetailModal extends React.Component {
	state = {
			quantity: 1,
			loading: false,
    		commentInput: '',
    		showLoadMore: true,
    		masanpham: 0,
		}
	addToCart = (proID) => {
		if(localStorage.token)
		{
			//return
		}
		let product = JSON.parse(localStorage.getItem("product") || "[]");
		const target = product.find(item => item.proID === proID);
		const index = product.indexOf(target)
		if(target) {
			product.splice(index, 1, {proID: proID,quantity: this.state.quantity})
		}
		else{
			product.push({
				proID: proID,
				quantity: this.state.quantity
			})
		}
		localStorage.setItem("product", JSON.stringify(product));
		message.success('Đã thêm vào giỏ');
	}
	componentWillReceiveProps() {
		this.setState({loading: false})
	}
	handleChange = (e) => {
		this.setState({quantity: e.target.value})
	}
	onSendComment = (e) => {
		if (e.key === 'Enter') {
			if (this.state.commentInput.trim() === "") {
				message.warning('Làm ơn không spam!');
				return;
			}
			this.props.addComment(this.state.masanpham, this.state.commentInput);
			this.setState({commentInput: ''})	;
		}
	}
	onInputChange = (e) => {
		this.setState({commentInput: e.target.value, masanpham: this.props.product.masanpham})
	}
	allComment = (masanpham) => {
		this.setState({loading: true, showLoadMore: false})
		this.props.getAllComment(masanpham);
	}
	render() {	
		const {product, comment} = this.props;
		let gia = parseInt(product.gia, 10).toLocaleString();
		return (
		  <Modal
          title="Chi tiết sản phẩm"
          visible={this.props.isOpen}
          footer={false}
          onCancel={() => this.props.onCancel()}
          width={1200}
          >
            <div>
			    <Row border="1">
			      <Col span={6} push={6}><img alt={product.tensanpham} src={product.hinhanh} width="80%"/></Col>
			      <Col span={6} push={6}>
			      	<h3>Tên: {product.tensanpham}</h3>
			      	<h3>Giá: {gia + ' đ'}</h3>
			      	<ul>
			      	<li>Lượt xem: {product.luotxem}</li>
			      	<li>Chất lượng tốt</li>
			      	<li>Sản phẩm chính hãng</li>
			      	</ul>
			      	<div>
			      		<Input style={{width: '50%'}} placeholder="Số lượng" type="number" max="100" min="1" defaultValue="1" onChange={this.handleChange}/>
			      		{' '}<Button type="primary" onClick={() => this.addToCart(product.masanpham)}>Thêm vào giỏ</Button>
			      	</div>
			      </Col>
			    </Row><hr/>

			    <Row>
			      	<h3>Sản phẩm có liên quan</h3>
			      	{this.props.relatedProducts.length > 0 && this.props.relatedProducts.map(b => (
			      		<Col className={'colCard ' + this.props.s} key={b.masanpham} 
			      		onClick={() => {this.props.onChange(b); 
			      						this.setState({showLoadMore: true, loading: false, commentInput: ''})}}>
				        <Card
					      cover={<img alt={b.tensanpham} src={b.hinhanh} className="imgCard"/>}
						>
						<Meta
						  title={b.gia.toLocaleString() + ' đ'}
						  style={{height: '75px'}}
					      description={b.tensanpham}
					    />
						</Card>
	      				</Col>
			      	))
			      	}
			    </Row><hr/>

			    <Row>
					<h3>Bình luận</h3>
					<List
						loading={this.state.loading}
				        className="comment"
				        itemLayout="horizontal"
				        dataSource={comment}
				        renderItem={item => (
					          <List.Item actions={[]}>
					            <List.Item.Meta
					              avatar={<Avatar/>}
					              title={<a href="#null">{item.email_user}</a>}
					              description={item.content}
					            />
					            <span>{moment(item.time).format("DD/MM/YYYY - hh:mm")}</span>
					          </List.Item>
					    )}
					/>
					<Row>
						<Button onClick={() => this.allComment(product.masanpham)} hidden={!this.state.showLoadMore}>Xem thêm bình luận</Button>
						<Input type="text" placeholder="Nhập bình luận" 
							   style={{width: '400px', marginLeft: '50px'}}
							   onKeyPress={this.onSendComment}
							   onChange={this.onInputChange}
							   value={localStorage.token ? this.state.commentInput : 'Cần đăng nhập để bình luận'}
							   disabled={!localStorage.token}
						/>
					</Row>
			    </Row>
		    </div>
          </Modal>
		);
	}
}