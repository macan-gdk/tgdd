import React from 'react';
import { Modal, Form, Button } from 'antd';
import FormItem from './LoginForm';

class ModalComponent extends React.Component {
	render() {
		const { visible, onCancel, onOk, form } = this.props;
		const { getFieldDecorator } = form;

		return (
			<Modal
				title={`Log in`}
				width='25%'
				visible={visible}
				onCancel={onCancel}
				onOk={onOk}
				okText={this.props.titleModal}
				footer={[
		            <Button key="cancel" onClick={onCancel}>Cancel</Button>,
		            <Button type="primary" key="login" onClick={onOk}>Log in</Button>,
		          ]}
			>
				<FormItem formField={{ getFieldDecorator }} />
			</Modal>
		);
	}
}

export default Form.create()(ModalComponent);
