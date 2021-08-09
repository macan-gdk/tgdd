import React from 'react';
import Card from './Card'
import { Layout, Form, Button, List } from 'antd';
import Modal from './Modal'
import urlConfig from '../../../../route/urlConfig';
import { Redirect } from 'react-router-dom'
const { Content } = Layout;
const url = `${urlConfig}/api/sanpham`; //http://localhost:8000/

class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            listItem: [],
            visible: false,
        };
    }

    componentDidMount() {
        if (localStorage.token) {
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                }
            })
                .then(response => { console.log(1111, response); response.json() })
                .then(item => {
                    item.forEach(element => { var date = new Date(element.ngaynhap); element.ngaynhap = date.toLocaleDateString() });
                    item.map(element => element.gia = element.gia.toLocaleString())
                    this.setState({ listItem: item })
                })
                .catch(err => console.log(err));
        }
    }

    editCard = (data, index) => {
        fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        })
            .then(response => response.json())
            .then(item => this.setState({ listItem: item }))
            .catch(err => console.log(err));
    }

    deleteCard = (masp) => {
        fetch(`${url}/${masp}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        })
            .then(res => res.json())
            .then(() => this.setState({ listItem: this.state.listItem.filter(data => data.masanpham !== masp) }))
            .catch(err => console.log(err));
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        const form = this.formRef.props.form;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    fetch(`${url}/${data.insertId}`, {
                        method: 'GET'
                    })
                        .then(res => res.json())
                        .then(item => this.setState({ listItem: [...this.state.listItem, item[0]], visible: false }))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err));
            form.resetFields();
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const token = localStorage.token;
        if (!token) {
            return <Redirect to="/" />
        }
        return (
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <div style={{
                    textAlign: 'center',
                    padding: '30px 0px',
                    backgroundColor: '#fff',
                }}>
                    <Button type="primary" onClick={this.showModal}>Insert Product</Button>
                </div>


                <Modal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    titleModal="Insert"
                />

                <List
                    style={{
                        padding: 24,
                        backgroundColor: '#f8f9fa',
                    }}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 2,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={this.state.listItem}
                    renderItem={(card, index) => (
                        <List.Item>
                            <Card
                                index={index}
                                infoCard={card}
                                editCard={this.editCard}
                                deleteCard={this.deleteCard}
                            />
                        </List.Item>
                    )}
                />

            </Content>
        )
    }
}
export default Form.create()(Product);
