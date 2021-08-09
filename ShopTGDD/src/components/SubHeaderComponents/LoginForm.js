import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.email, values.password);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mật khẩu" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Duy trì tài khoản</Checkbox>
          )}<br/>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Đăng nhập
          </Button>{' '}
          hoặc <a href="#register" onClick={this.props.onRegister}>Đăng ký ngay!</a><br/>
          <a onClick={this.props.openForgotPassword} className="login-form-forgot" href="#forgot">Quên mật khẩu?</a>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);