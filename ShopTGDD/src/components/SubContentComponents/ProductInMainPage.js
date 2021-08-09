import React from 'react';
import { Layout, Row } from 'antd';
import OneProduct from './OneProductComponent';
import DetailModal from './DetailModal';
const {Content} = Layout;

export default class ProductInMainPage extends React.Component {
	state = {
		product: {},
		modalIsOpen: false,
		relatedProducts: []
	}
	onSeeDetail = (product) => {
		this.props.loadCommentForProduct(product.masanpham, true);
		
		let relatedProducts = [];
		let index = this.props.product.indexOf(product) + 1;
		let length = this.props.product.length;
		for (let i = index; i < index + 6; i++) {
			let j = i;
			if (j >= length) {
				j = j - length;
			}
			relatedProducts.push(this.props.product[j]);
		}
		this.setState({product, modalIsOpen: true, relatedProducts});
		this.props.upView(product.masanpham);
	}
	getAllComment = (productId) => {
		this.props.loadCommentForProduct(productId, false)
	}
	onCloseModal = () => {
		this.setState({modalIsOpen: false});
	}
	addComment = (productId, content) => {
		let data = {};
		data.id = productId;
		data.content = content;
		this.props.createComment(data);
	}
	render() {
		return (
		  <Content className="hightlight">
	        <div>
	           <h3>{this.props.title}</h3>
	           <Row gutter={24}>
	           	{this.props.product.map(b => (
	           	  <OneProduct key={b.masanpham} b={b} onOpenModal={() => this.onSeeDetail(b)}/>
	           	))}  
			    </Row> 
	        </div>
	        <DetailModal 
	        	product={this.state.product} 
	        	isOpen={this.state.modalIsOpen}
	        	onCancel={this.onCloseModal}
	        	relatedProducts={this.state.relatedProducts}
	        	onChange={this.onSeeDetail}
	        	comment={this.props.comment}
	        	getAllComment={(id) => this.getAllComment(id)}
	        	addComment={(productId, content) => this.addComment(productId, content)}
	        />
	      </Content>
		);
	}
}