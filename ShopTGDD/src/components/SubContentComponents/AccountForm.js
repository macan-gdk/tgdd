import { Form, Icon, Input, Button } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 8 },
      },
    };

class AccountForm extends React.Component {
  componentDidMount() {
    this.props.form.setFields({
              firstname: {
                value: this.props.user.firstname
              },
              lastname: {
                value: this.props.user.lastname
              },
              address: {
                value: this.props.user.address
              },
              phone: {
                value: this.props.user.phone
              },
            });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onUpdate(values);
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
    const  {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="account-form">
        <div className="account-animation">Quản lý tài khoản</div>
        <FormItem {...formItemLayout}  label="Tên">
          {getFieldDecorator('firstname', {
            rules: [{ required: true, message: 'Vui lòng nhập tên!' }]
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Tên"/>
          )}
        </FormItem>
         <FormItem {...formItemLayout}  label="Họ và chữ lót">
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Vui lòng nhập họ và chữ lót!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Họ và chữ lót" />
          )}
        </FormItem>
         <FormItem {...formItemLayout}  label="Địa chỉ">
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Vui lòng nhập địa chỉ!' }],
          })(
            <Input prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Địa chỉ" />
          )}
        </FormItem>
         <FormItem {...formItemLayout}  label="Số điện thoại">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }, {validator: this.isPhoneNumber}]
          })(
            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Số điện thoại" />
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="Mật khẩu cũ">
          {getFieldDecorator('oldpassword', {
            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }, {validator: this.rulePassword}]
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password" placeholder="Mật khẩu cũ"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout}  label="Mật khẩu mới">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }, {validator: this.rulePassword}]
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password" placeholder="Mật khẩu mới" onChange={this.onPasswordChange}/>
          )}
        </FormItem>
         <FormItem {...formItemLayout}  label="Nhập lại mật khẩu">
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: 'Vui lòng nhập lại mật khẩu trên!' }, {validator: this.compareToFirstPassword}]
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                   type="password" placeholder="Nhập lại mật khẩu" 
            />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className="account-form-button">
            Thay đổi
        </Button>
      </Form>
    );
  }
}

export default Form.create()(AccountForm);