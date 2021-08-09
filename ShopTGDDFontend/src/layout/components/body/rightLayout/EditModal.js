import React from 'react';
import { Modal, Form } from 'antd';
import FormItem from './EditForm';

class ModalComponent extends React.Component {
	render() {
		const { visible, onOk, onCancel, form } = this.props;
		const { getFieldDecorator } = form;

		return (
			<Modal
				title={`${this.props.titleModal} Product`}
				visible={visible}
				onOk={onOk}
				onCancel={onCancel}
				okText={this.props.titleModal}
			>
				<FormItem formField={{ getFieldDecorator }} />
			</Modal>
		);
	}
}

export default Form.create()(ModalComponent);
