import React from 'react';
import {connect} from 'react-redux';
import {Layout, Row} from 'antd';
import OneProduct from './OneProductComponent';
import DetailModal from './DetailModal';
import {loadCommentForProduct, createComment} from '../../api/comment';
import {upView} from '../../api/product';
const {Content} = Layout;

class Search extends React.Component {
	state = {
		modalIsOpen: false,
		relatedProducts: [],
		product: {}
	}
	onSeeDetail = (product) => {
		this.props.loadCommentForProduct(product.masanpham, true);

		let relatedProducts = [];
		const {productsBySearch} = this.props.products;
		let index = productsBySearch.indexOf(product) + 1;
		let length = productsBySearch.length;
		for (let i = index; i < index + 6; i++) {
			let j = i;
			if (j >= length) {
				j = j - length;
			}
			relatedProducts.push(productsBySearch[j]);
		}
		this.setState({product, modalIsOpen: true, relatedProducts});
		this.props.upView(product.masanpham);
	}
	getAllComment = (productId) => {
		this.props.loadCommentForProduct(productId, false)
	}
	addComment = (productId, content) => {
		let data = {};
		data.id = productId;
		data.content = content;
		this.props.createComment(data);
	}
	onCloseModal = () => {
		this.setState({modalIsOpen: false});
	}
	render() {
		const {productsBySearch} = this.props.products;
		return (
		<Layout style={{background: 'transparent'}}>
		<Content className="hightlight">
			{productsBySearch.length > 0 ? (
			   <React.Fragment>
	           <h3>Trang tìm kiếm</h3>
	           <Row gutter={24}>
	           	{productsBySearch.map(b => (
	           	  <OneProduct b={b}
	           	  			  onOpenModal={() => this.onSeeDetail(b)} 
	           	  			  key={b.masanpham}
	           	  	/>
	           	))}  
			    </Row>
		        </React.Fragment>
	        ) : <h3>Không có sản phẩm</h3>}
	      </Content>
	      <DetailModal 
	        	product={this.state.product} 
	        	isOpen={this.state.modalIsOpen}
	        	onCancel={this.onCloseModal}
	        	relatedProducts={this.state.relatedProducts}
	        	onChange={this.onSeeDetail}
	        	comment={this.props.comment.comment}
	        	getAllComment={(id) => this.getAllComment(id)}
	        	addComment={(productId, content) => this.addComment(productId, content)}
	        />
	    </Layout>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	loadCommentForProduct(productId, limit) {
    	loadCommentForProduct(dispatch, productId, limit)
    },
    createComment(data) {
    	createComment(dispatch, data)
    },
    upView(id) {
    	upView(dispatch, id)
    }
})

const mapStateToProps = state => ({
    products: state.products,
    comment: state.comment
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)