import React from 'react';
import { connect } from 'react-redux';
import { productLoadByCat, totalProductByCat, upView } from '../../api/product';
import { loadCategories } from '../../api/categories';
import { loadCommentForProduct, createComment } from '../../api/comment';
import { Layout, Row, Pagination, Menu } from 'antd';
import OneProduct from './OneProductComponent';
import DetailModal from './DetailModal';
const { Content, Sider } = Layout;
class ProductByCatPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cat: {
                maloai: 1,
                tenloai: 'Iphone'
            },
            resetPage: 1,
            product: {},
            modalIsOpen: false,
            relatedProducts: []
        }
        this.props.loadCategories();
        this.props.productLoadByCat(1, 1);
        this.props.totalProductByCat(1);
    }
    onChangeCat = (maloai) => {
        let cat = this.props.categories.loaisanpham.find(c => c.maloai === maloai);
        this.setState({ cat, resetPage: 1 });
        this.props.productLoadByCat(maloai, 1);
        this.props.totalProductByCat(maloai);
    }
    onChangePage = (page, pageSize) => {
        this.props.productLoadByCat(this.state.cat.maloai, page);
    }
    onSeeDetail = (product) => {
        this.props.loadCommentForProduct(product.masanpham, true);

        let relatedProducts = [];
        const { productsByCat } = this.props.products;
        let index = productsByCat.indexOf(product) + 1;
        let length = productsByCat.length;
        if (length <= 6) {
            this.setState({ product, modalIsOpen: true, relatedProducts: productsByCat.filter(b => b.masanpham !== product.masanpham) });
        }
        else {
            for (let i = index; i < index + 6; i++) {
                let j = i;
                if (j >= length) {
                    j = j - length;
                }
                relatedProducts.push(productsByCat[j]);
            }
            this.setState({ product, modalIsOpen: true, relatedProducts });
        }
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
        this.setState({ modalIsOpen: false });
    }
    render() {
        return (
            <Layout style={{ background: 'transparent' }}>
                <Sider className="siderStyle">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        {this.props.categories.loaisanpham.map(cat => (
                            <Menu.Item key={cat.maloai}
                                onClick={() => this.onChangeCat(cat.maloai, 1)}
                            >{cat.tenloai}</Menu.Item>
                        ))}
                    </Menu>
                </Sider>

                <Content className="hightlight-product">
                    {this.props.products.productsByCat.length > 0 ? (
                        <React.Fragment>
                            <h3>{this.state.cat.tenloai}</h3>

                            <Row gutter={24}>
                                {this.props.products.productsByCat.map(b => (
                                    <OneProduct b={b} s="width20"
                                        onOpenModal={() => this.onSeeDetail(b)}
                                        key={b.masanpham}
                                    />
                                ))}
                            </Row>

                            <Pagination onChange={this.onChangePage} pageSize={20} current={this.state.currentPage} defaultCurrent={1} total={this.props.products.totalProductByCat} style={{ textAlign: 'center' }} />
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
        );
    }
}
const mapDispatchToProps = dispatch => ({
    productLoadByCat(id, page) {
        productLoadByCat(dispatch, id, page)
    },
    loadCategories() {
        loadCategories(dispatch)
    },
    totalProductByCat(id) {
        totalProductByCat(dispatch, id)
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
const mapStateToProps = state => ({
    products: state.products,
    categories: state.categories,
    comment: state.comment
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductByCatPage);