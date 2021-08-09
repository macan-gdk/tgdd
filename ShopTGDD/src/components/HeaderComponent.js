import React from 'react';
import { Layout, Icon, Input, Button, Menu, Dropdown, Modal } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout, register, forgotPassword } from '../api/user';
import { loadBySearch } from '../api/product';
import LoginForm from './SubHeaderComponents/LoginForm';
import RegisterForm from './SubHeaderComponents/RegisterForm';
import ForgotPasswordForm from './SubHeaderComponents/ForgotPasswordForm';
const { Header } = Layout;
const Search = Input.Search;

const accountMenu = (logout) => (
    <Menu>
        <Menu.Item>
            <Link to="/account">Quản lý tài khoản</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/history">Lịch sử mua hàng</Link>
        </Menu.Item>
        <Menu.Item onClick={() => logout()}>
            <span>Thoát</span>
        </Menu.Item>
    </Menu>
);

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoginModalOpen: false,
            isRegisterModalOpen: false,
            isForgotPasswordModalOpen: false,
            search: false,
        }
    }
    componentWillReceiveProps() {
        this.setState({ search: false })
    }
    openLoginModal = () => {
        this.setState({ isLoginModalOpen: true })
    }
    closeLoginModal = () => {
        this.setState({ isLoginModalOpen: false })
    }
    openRegisterModal = () => {
        this.setState({ isRegisterModalOpen: true })
    }
    closeRegisterModal = () => {
        this.setState({ isRegisterModalOpen: false })
    }
    openForgotPasswordModal = () => {
        this.setState({ isForgotPasswordModalOpen: true, isLoginModalOpen: false })
    }
    closeForgotPasswordModal = () => {
        this.setState({ isForgotPasswordModalOpen: false })
    }
    login = (email, password) => {
        this.props.login(email, password, this.closeLoginModal);
    }
    logout = () => {
        this.props.logout();
    }
    registerClick = (data) => {
        this.props.register(data, this.goToLogin);
    }
    goToLogin = () => {
        this.setState({ isRegisterModalOpen: false, isLoginModalOpen: true })
    }
    onSubmitForgotPassword = (email) => {
        this.props.forgotPassword(email, this.closeForgotPasswordModal);
    }
    render() {
        return (
            <React.Fragment>
                <Header id="header">
                    <Link to='/'><img className="logo" src="/logo.png" alt="logo" width="8%" height="100%" /></Link>
                    <Link to='/category'>
                        <Button className="dropdown">

                            <Icon type="bars" />{' '}Danh mục sản phẩm
			            </Button>
                    </Link>
                    <Search
                        placeholder="Tìm kiếm sản phẩm"
                        style={{ width: "40%", margin: "26px" }}
                        enterButton
                        onSearch={value => {
                            this.props.loadBySearch(value);
                            this.setState({ search: true });
                        }}
                    />
                    <div className="rightHeader">
                        {this.props.user.token === null ? (
                            <React.Fragment>
                                <Icon type="user-add" className="dangky" onClick={this.openRegisterModal}><span>Đăng ký</span></Icon>{' | '}
                                <Icon type="aliwangwang" className="dangnhap" onClick={this.openLoginModal}><span>Đăng nhập</span></Icon>
                            </React.Fragment>
                        ) :
                            <Dropdown overlay={accountMenu(this.logout)}>
                                <a className="ant-dropdown-link account" href="#account">
                                    Hi {this.props.user.firstname} <Icon type="down" />
                                </a>
                            </Dropdown>
                        }
                        {' | '}
                        <Link to='/cart'><Icon type="shopping-cart" className="iconCart" ></Icon></Link>
                    </div>
                    <Modal
                        visible={this.state.isLoginModalOpen}
                        footer={null}
                        title={'Đăng nhập'}
                        onCancel={this.closeLoginModal}
                    >
                        <LoginForm onSubmit={(email, password) => this.login(email, password)}
                            onRegister={() => this.setState({ isLoginModalOpen: false, isRegisterModalOpen: true })}
                            openForgotPassword={() => this.openForgotPasswordModal()} />
                    </Modal>
                    <Modal
                        visible={this.state.isRegisterModalOpen}
                        title={'Đăng ký'}
                        footer={null}
                        onCancel={this.closeRegisterModal}
                    >
                        <RegisterForm onRegister={(values) => this.registerClick(values)} />
                    </Modal>
                    <Modal
                        visible={this.state.isForgotPasswordModalOpen}
                        title={'Quên mật khẩu'}
                        footer={null}
                        onCancel={this.closeForgotPasswordModal}
                    >
                        <ForgotPasswordForm onSubmit={(email) => this.onSubmitForgotPassword(email)} />
                    </Modal>
                </Header>
                {this.state.search ? (<Redirect to="/search" />) : ''}
            </React.Fragment>

        )



    }
}

const mapStateToProps = state => ({
    user: state.user,
    products: state.products
})

const mapDispatchToProps = dispatch => ({
    login(email, password, close) {
        login(dispatch, email, password, close)
    },
    logout() {
        logout(dispatch)
    },
    register(data, goToLogin) {
        register(dispatch, data, goToLogin)
    },
    forgotPassword(email, close) {
        forgotPassword(dispatch, email, close)
    },
    loadBySearch(query) {
        loadBySearch(dispatch, query)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)