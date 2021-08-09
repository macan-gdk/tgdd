import { Form, Icon, Input, Button, message } from 'antd';
import React from 'react';
import Captcha from 'react-captcha';
import axios from 'axios';
import url from '../../urlBackend';
const FormItem = Form.Item;

class RegisterForm extends React.Component {
  state = {
    robot: true
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post(`${url}/checkemail`, {email: values.email})
        .then(res => {
          if (res.data.error !== null) {
            message.error(res.data.error);
            this.props.form.setFields({email: null});
          }
          else {
            this.props.onRegister(values);
            this.props.form.resetFields();
            this.setState({robot: true});
          }
        }).catch(err => console.log(err));
        
      }
    });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu không trùng khớp!');
    } else {
      callback();
    }
  }
  isPhoneNumber = (rule, value, callback) => {
    if ((value && value.length < 10) || isNaN(value)) {
      callback('Số điện thoại không hợp lệ!');
    }
    callback();
  }
  onPasswordChange = () => {
    const form = this.props.form;
    form.setFields({confirm: null});
  }
  rulePassword = (rule, value, callback) => {
    if (value && value.length < 6) {
      callback('Mật khẩu ít nhất 6 ký tự!');
    }
      callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
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
            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }, {validator: this.rulePassword}]
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password" placeholder="Mật khẩu" onChange={this.onPasswordChange}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: 'Vui lòng nhập lại mật khẩu trên!' }, {validator: this.compareToFirstPassword}]
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                   type="password" placeholder="Nhập lại mật khẩu" 
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('firstname', {
            rules: [{ required: true, message: 'Vui lòng nhập tên!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Tên" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Vui lòng nhập họ và chữ lót!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Họ và chữ lót" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Vui lòng nhập địa chỉ!' }],
          })(
            <Input prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Địa chỉ" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }, {validator: this.isPhoneNumber}]
          })(
            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Số điện thoại" />
          )}
        </FormItem>
        <Captcha
          sitekey = '6LfqhFwUAAAAAOODrXiIvR2CHMfNHjVfe8_pcSIT'
          lang = 'en'
          theme = 'light'
          type = 'image'
          callback = {() => this.setState({robot: false})}
        />
        <Button disabled={this.state.robot} type="primary" htmlType="submit" className="register-form-button">
            Đăng ký
        </Button>{' '}
      </Form>
    );
  }
}

export default Form.create()(RegisterForm);