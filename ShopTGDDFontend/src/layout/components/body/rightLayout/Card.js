import React from 'react'
import FormModal from './EditModal'
import { Card, Icon, Modal } from 'antd';
import urlConfig from '../../../../route/urlConfig';
const confirm = Modal.confirm;
const { Meta } = Card;
const url = `${urlConfig}/api/sanpham`;

class CardComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            detail: false,
            product: {}
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    setFormFields = data => {
        this.formRef.props.form.setFieldsValue({
            tensanpham: data.tensanpham,
            gia: data.gia,
            soluong: data.soluong,
            hinhanh: data.hinhanh,
            loaisanpham: data.loaisanpham,
            luotxem: data.luotxem,
            daban: data.daban,
            ngaynhap: data.ngaynhap
        });
    };

    showEditModal = () => {
        this.setState({ visible: true });
        fetch(`${url}/${this.props.infoCard.masanpham}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                data.forEach(element => { var date = new Date(element.ngaynhap); element.ngaynhap = date.toLocaleDateString() });
                this.setFormFields(data[0]);
                this.setState({
                    product: data[0]
                })
            })
            .catch(err => console.error(err));
    };
    handleEditCancel = e => {
        this.setState({
            visible: false,
            detail: false,
        });
    };
    handleEditOk = () => {
        const form = this.formRef.props.form;
        const id = this.props.infoCard.masanpham;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            values.masanpham = this.state.product.masanpham
            values.nhasanxuat = this.state.product.nhasanxuat
            //values.ngaynhap = moment(values.ngaynhap, "DD/MM/YYYY").format('YYYY-MM-DD')
            fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(values);
                    this.props.editCard(data, this.props.index);
                })
                .catch(err => this.openNotification('error', err));
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    showDeleteModal = () => {
        const id = this.props.infoCard.masanpham;
        const deleteCard = (id) => this.props.deleteCard(id);
        const name = this.props.infoCard.tensanpham;
        confirm({
            title: 'Do you Want to delete this product?',
            content: name,
            onOk() {
                deleteCard(id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    render() {
        return (
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={this.props.infoCard.tensanpham} src={this.props.infoCard.hinhanh} height="300px"
                    width="100%" onClick={() => this.setState({ detail: true })} />}
                actions={[<Icon onClick={this.showEditModal} type="edit" />, <Icon onClick={this.showDeleteModal} type="delete" />]}
            >
                <Meta
                    title={this.props.infoCard.tensanpham}
                    description={`Price: ${this.props.infoCard.gia}`}
                />

                <FormModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onOk={this.handleEditOk}
                    onCancel={this.handleEditCancel}
                    titleModal="Update"
                    editCard={this.props.editCard}
                    deleteCard={this.props.deleteCard}
                />

                <Modal
                    title={this.props.infoCard.tensanpham}
                    visible={this.state.detail}
                    onOk={this.handleEditCancel}
                    onCancel={this.handleEditCancel}
                >
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ width: '200px', height: '250px' }}><img alt={this.props.infoCard.tensanpham} src={this.props.infoCard.hinhanh} width="90%%" height="100%" /></td>
                                <td>
                                    ID: {this.props.infoCard.masanpham}<br />

						            Price: {this.props.infoCard.gia}<br />

						            Quantity: {this.props.infoCard.soluong}<br />

						            View: {this.props.infoCard.luotxem}<br />

						            Sold: {this.props.infoCard.daban}<br />

						            Date: {this.props.infoCard.ngaynhap}<br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
            </Card>

        )
    }

}

export default CardComponent