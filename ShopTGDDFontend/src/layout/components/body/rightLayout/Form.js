import React from 'react';
import { Form, Input, Select } from 'antd';
import urlConfig from '../../../../route/urlConfig';
const FormItem = Form.Item;
const Option = Select.Option;
const url = `${urlConfig}/api/loaisanpham`;

class FormModal extends React.Component {
	constructor() {
		super();
		this.state = {
			categories: []
		}
	}

	componentDidMount() {
		fetch(url)
		.then(res => res.json())
		.then(data => {
			this.setState({categories: data})
		})
		.catch(err => console.log(err))
	}
	render() {

		const { getFieldDecorator } = this.props.formField;
		let selectCategories = []
		for (let element of this.state.categories) {
			selectCategories.push(
				<Option key={element.maloai}>{element.tenloai}</Option>
			);
		}
		return (
			<Form layout="vertical">
				<FormItem label="Name">
					{getFieldDecorator('tensanpham', {
						rules: [
							{
								required: true,
								message:
									'Please input the name of product!',
							},
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Price">
					{getFieldDecorator('gia')(
						<Input type="textarea" />
					)}
				</FormItem>
				<FormItem label="Amount">
					{getFieldDecorator('soluong')(
						<Input type="textarea" />
					)}
				</FormItem>
				<FormItem label="Image URL">
					{getFieldDecorator('hinhanh')(<Input type="textarea" />)}
				</FormItem>
				<FormItem label="Category">
					{getFieldDecorator('loaisanpham')(<Select>{selectCategories}</Select>)}
				</FormItem>
			</Form>
		);
	}
}

export default FormModal;
