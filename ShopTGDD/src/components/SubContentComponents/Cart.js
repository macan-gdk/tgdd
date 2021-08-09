import React from 'react';
import { Layout, Button, Table, Input, Icon, message } from 'antd';
import url from '../../urlBackend';
import moment from 'moment';
const { Content } = Layout;


class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ? (
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                            type="number"
                            min="1"
                            max="1000"
                            suffix={
                                <Icon
                                    type="check"
                                    className="editable-cell-icon-check"
                                    onClick={this.check}
                                />
                            }
                        />
                    ) : (
                            <div style={{ paddingRight: 24 }}>
                                {value || ' '}
                                <Icon
                                    type="edit"
                                    className="editable-cell-icon"
                                    onClick={this.edit}
                                />
                            </div>
                        )
                }
            </div>
        );
    }
}

export default class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            cart: [],
        }
    }

    componentDidMount() {
        if (localStorage.token) {

        }
        let proIDs = JSON.parse(localStorage.getItem("product") || "[]");
        if (proIDs) {
            proIDs.forEach(element => {
                fetch(`${url}/sanpham/${element.proID}`)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(element2 => {
                            element2.key = element.proID;
                            element2.soluong = element.quantity;
                            element2.thanhtien = (Number(element2.soluong) * Number(element2.gia))

                            this.setState({ cart: [...this.state.cart, element2] });
                        });
                    })
                    .catch(err => console.log(err))
            })
        }
    }

    deleteProduct = (key) => {
        if (localStorage.token) {

        }
        const { cart } = this.state;
        this.setState({ cart: cart.filter(p => p.masanpham !== key) })
        let productList = JSON.parse(localStorage.getItem("product") || "[]")
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].proID === key) {
                productList.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("product", JSON.stringify(productList));
    }

    onCellChange = (key, dataIndex) => {
        return (value) => {
            const cart = [...this.state.cart];
            const target = cart.find(item => item.key === key);
            console.log(target)
            if (target) {
                target[dataIndex] = value;
                target.thanhtien = Number(value) * Number(target.gia)
                this.setState({ cart });
                let productList = JSON.parse(localStorage.getItem("product") || "[]")
                for (let i = 0; i < productList.length; i++) {
                    if (productList[i].proID === key) {
                        productList[i].quantity = value
                        break;
                    }
                }
                localStorage.setItem("product", JSON.stringify(productList));
            }
        };
    }

    checkOut = () => {
        if (!localStorage.token) {
            message.error('Bạn cần phải đăng nhập để thanh toán');
            return
        }
        if (!localStorage.product) {
            message.error('Bạn không có hàng trong giỏ');
            return
        }
        let email = localStorage.getItem("email")
        let ngaydat = moment().format("YYYY-MM-DD")
        let diachi = localStorage.getItem("address")
        let sdt = localStorage.getItem("phone")
        let tongtien = 0
        this.state.cart.forEach(element => {
            tongtien = tongtien + Number(element.gia) * Number(element.soluong)
        })

        let values = {
            email,
            ngaydat,
            diachigiaohang: diachi,
            sdt,
            tongtien,
            tinhtrang: 0
        };

        fetch(`${url}/donhang`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify(values),
        })
            .then(res => res.json())
            .then(data => {
                this.state.cart.forEach(element => {
                    let item = {
                        madonhang: data.insertId,
                        masanpham: element.masanpham,
                        dongia: element.gia,
                        soluong: element.soluong
                    }
                    fetch(`${url}/ctdonhang`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.token}`,
                        },
                        body: JSON.stringify(item),
                    })
                        .then(res => res.json())
                        .then(data => {
                            fetch(`${url}/sanpham/updateSoLuong/${item.masanpham}`, {
                                method: 'PUT',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(item),
                            })
                                .then(res => res.json())
                                .then(data => {

                                })
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                })
                localStorage.removeItem("product")
                this.setState({ cart: [] })
            })
            .catch(err => console.log(err))
    }

    render() {
        const columns = [{
            title: 'Sản phẩm',
            dataIndex: 'tensanpham',
            key: 'tensanpham'
        }, {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia'
        }, {
            title: 'Số lượng',
            dataIndex: 'soluong',
            key: 'soluong',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'soluong')}
                />
            ),
        }, {
            title: 'Thành tiền',
            dataIndex: 'thanhtien',
            key: 'thanhtien'
        }, {
            title: '',
            dataIndex: 'option',
            key: 'option',
            render: (text, record) => {
                return (
                    <Button onClick={() => this.deleteProduct(record.key)} type="danger" icon="close" />
                )
            }
        }]

        return (
            <React.Fragment>
                <Layout>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <Table footer={(data) => {
                            return <div><b>Tổng tiền:</b> {data.reduce((sum, record) => sum + record.thanhtien, 0)}</div>
                        }} pagination={false} dataSource={this.state.cart} columns={columns} />
                        <Button onClick={this.checkOut} type="primary" style={{ float: 'right', margin: '10px' }}>Thanh toán</Button>
                    </Content>
                </Layout>
            </React.Fragment>
        )
    }
}