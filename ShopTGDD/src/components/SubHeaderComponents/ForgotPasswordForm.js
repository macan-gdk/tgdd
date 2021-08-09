import { Form, Icon, Input, Button } from 'antd';
import React from 'react';
const FormItem = Form.Item;

class ForgotPasswordForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.email);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="forgotpassword-form">
        <FormItem>
           {getFieldDecorator('email', {
             rules: [{
              type: 'email', message: 'Email không hợp lệ!',
            }, {
              required: true, message: 'Vui lòng nhập email!',
            },]
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                   placeholder="Email"
            />
          )}
        </FormItem>  
          <Button type="primary" htmlType="submit" className="forgotpassword-form-button">
            Gửi yêu cầu
          </Button>
      </Form>
    );
  }
}

export default Form.create()(ForgotPasswordForm);