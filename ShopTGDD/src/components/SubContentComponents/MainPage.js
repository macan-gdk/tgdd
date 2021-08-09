import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';
import { loadBestSell, loadBestView } from '../../api/bestsellbestview';
import { loadCommentForProduct, createComment } from '../../api/comment';
import { upView } from '../../api/product';
import Product from './ProductInMainPage';

class MainPage extends React.Component {
    componentWillMount() {
        this.props.loadBestView();
        this.props.loadBestSell();
    }
    render() {
        return (
            <React.Fragment>
                <Carousel autoplay>
                    <div><img src="./a.png" width="100%" height="400px" alt="slider1" /></div>
                    <div><img src="./b.png" width="100%" height="400px" alt="slider2" /></div>
                    <div><img src="./c.png" width="100%" height="400px" alt="slider3" /></div>
                </Carousel>
                <Product title={'Sản phẩm bán chạy nhất'}
                    product={this.props.bestsellbestview.bestsell}
                    upView={(id) => this.props.upView(id)}
                    loadCommentForProduct={(id, limit) => this.props.loadCommentForProduct(id, limit)}
                    comment={this.props.comment.comment}
                    createComment={(data) => this.props.createComment(data)}
                />
                <Product title={'Sản phẩm xem nhiều nhất'}
                    product={this.props.bestsellbestview.bestview}
                    upView={(id) => this.props.upView(id)}
                    loadCommentForProduct={(id, limit) => this.props.loadCommentForProduct(id, limit)}
                    comment={this.props.comment.comment}
                    createComment={(data) => this.props.createComment(data)}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    bestsellbestview: state.bestsellbestview,
    comment: state.comment,
})

const mapDispatchToProps = dispatch => ({
    loadBestSell() {
        loadBestSell(dispatch)
    },
    loadBestView() {
        loadBestView(dispatch)
    },
    upView(id) {
        upView(dispatch, id)
    },
    loadCommentForProduct(productId, limit) {
        loadCommentForProduct(dispatch, productId, limit)
    },
    createComment(data) {
        createComment(dispatch, data)
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);