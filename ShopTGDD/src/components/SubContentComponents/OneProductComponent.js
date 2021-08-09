import React from 'react';
import {Card, Col, Icon, message} from 'antd';
const {Meta} = Card;

export default class OneProductComponent extends React.Component {

	addToCart = (proID) => {
		if(localStorage.token)
		{
			//return
		}
		let product = JSON.parse(localStorage.getItem("product") || "[]");
		const target = product.find(item => item.proID === proID);
		const index = product.indexOf(target)
		if(target) {
			const newQuantity = target.quantity + 1
			product.splice(index, 1, {proID: proID,quantity: newQuantity})
		}
		else{
			product.push({
				proID: proID,
				quantity: 1
			})
		}
		localStorage.setItem("product", JSON.stringify(product));
		message.success('Đã thêm vào giỏ');
	}

	render() {
		const {b} = this.props;
		return (
		<React.Fragment>
       	  <Col className={'colCard ' + this.props.s}>
	        <Card
		      cover={<img alt={b.tensanpham} src={b.hinhanh} className="imgCard"/>}
		      actions={[
		      	
		      	<Icon className="iconcart" style={{fontSize: 22}} type="shopping-cart" onClick={() => this.addToCart(this.props.b.masanpham)}/>,
		      	<Icon className="iconcart" type="arrows-alt" onClick={this.props.onOpenModal} />
		      ]}
			>
			<Meta
			  title={b.gia.toLocaleString() + ' đ'}
			  style={{height: '75px'}}
		      description={b.tensanpham}
		    />
			</Card>
	      </Col>
	    </React.Fragment>
		);
	}
}