import React from 'react';
import { Layout, Button, Modal, Input, Table, Divider, Popconfirm } from 'antd';
import urlConfig from '../../../../route/urlConfig';
import { Redirect } from 'react-router-dom'
const { Content } = Layout
const url = `${urlConfig}/api/loaisanpham`; //http://localhost:8000/api/loaisanpham

export default class Producer extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            tenloai: '',
            producers: [
                {
                    maloai: '3',
                    tenloai: '3',
                    key: '3'
                },
                {
                    maloai: '1',
                    tenloai: '1',
                    key: '1'
                },
                {
                    maloai: '2',
                    tenloai: '2',
                    key: '2'
                }
            ],
            action: 'Create',
            maloai: 0
        }
    }

    componentDidMount() {
        if (localStorage.token) {
            // fetch(url, {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.token}`,
            //     }
            // })
            //     .then(resp => resp.json())
            //     .then(items => {
            //         console.log(111, items);
            //         items.map(i => i.key = i.maloai);
            //         this.setState({ producers: items });
            //     })
            //     .catch(err => console.log(err))
        }

    }

    showModal = (tenloai = null, maloai = null) => {
        this.setState({
            visible: true,
            tenloai: tenloai ? tenloai : '',
            action: tenloai ? 'Update' : 'Create',
            maloai: maloai ? maloai : 0
        })
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    delete = (maloai) => {
        const { producers } = this.state;
        fetch(`${url}/${maloai}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        })
            .then(res => res.json())
            .then(() => this.setState({ producers: producers.filter(p => p.maloai !== maloai) }))
            .catch(err => console.log(err));
    }

    create = () => {
        const { producers, tenloai } = this.state;
        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify({ "tenloai": tenloai }),
        })
            .then(res => res.json())
            .then(item => this.setState({
                producers: producers.concat([{ maloai: item.insertId, tenloai: tenloai, key: item.insertId }]),
                visible: false
            }))
            .catch(err => console.log(err));
    }

    update = () => {
        const { producers, tenloai, maloai } = this.state;
        fetch(`${url}/${maloai}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify({ "tenloai": tenloai }),
        })
            .then(res => res.json())
            .then(item => this.setState({
                producers: producers.map(p => { if (p.maloai !== maloai) return p; return { ...p, tenloai: tenloai } }),
                visible: false,
            }))
            .catch(err => console.log(err));
    }
    onChangeName = (e) => {
        this.setState({ tenloai: e.target.value });
    }

    render() {
        const token = localStorage.token;
        if (!token) {
            return <Redirect to="/" />
        }
        const col = [
            { key: -1 }, { key: -2 },
            {
                title: 'ID',
                dataIndex: 'maloai',
                key: 'maloai',
            },
            {
                title: 'Name',
                dataIndex: 'tenloai',
                key: 'tenloai',
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="#nothing" onClick={() => this.showModal(record.tenloai, record.maloai)}>Update</a>
                        <Divider type="vertical" />
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.maloai)}>
                            <a href="#nothing">Delete</a>
                        </Popconfirm>
                    </span>
                ),
            }];

        return (
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <div style={{
                    textAlign: 'center',
                    padding: '30px 0px',
                    backgroundColor: '#fff',
                }}>
                    <Button type="primary" onClick={() => this.showModal()}>Insert Producer</Button>
                </div>

                <Modal
                    title={this.state.action + ' Producer'}
                    visible={this.state.visible}
                    onOk={this.state.maloai === 0 ? this.create : this.update}
                    onCancel={this.handleCancel}
                >
                    <p>
                        Name
			          <Input style={{ width: '88%', marginLeft: '3%' }}
                            placeholder="Please input name"
                            type="text"
                            value={this.state.tenloai}
                            onChange={this.onChangeName}
                        />
                    </p>
                </Modal>

                <Table dataSource={this.state.producers} columns={col} />
            </Content>
        )
    }
}