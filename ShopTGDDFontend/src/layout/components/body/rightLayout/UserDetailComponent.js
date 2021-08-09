import React from 'react';
import { Layout, Input, Button, message } from 'antd';
import urlConfig from '../../../../route/urlConfig';
const { Content } = Layout
const url = `${urlConfig}/api/user`;
export default class UserDetail extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            password: null
        }
    }
    componentWillMount() {
        fetch(`${url}/${localStorage.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        })
            .then(res => res.json())
            .then(data => this.setState({ user: data[0] }))
            .catch(err => console.log(err));
    }
    onChangeFirstname = (e) => {
        this.setState({ ...this.state, user: { ...this.state.user, firstname: e.target.value } })
    }
    onChangeLastname = (e) => {
        this.setState({ ...this.state, user: { ...this.state.user, lastname: e.target.value } })
    }
    onChangeAddress = (e) => {
        this.setState({ ...this.state, user: { ...this.state.user, address: e.target.value } })
    }
    onChangePhone = (e) => {
        this.setState({ ...this.state, user: { ...this.state.user, phone: e.target.value } })
    }
    onChangePassword = (e) => {
        this.setState({ user: { ...this.state.user, password: e.target.value } })
    }
    edit = () => {
        var pass1 = document.getElementById('pass1').value;
        var pass2 = document.getElementById('pass2').value;
        if (pass1.length < 8) {
            message.error('Password at least 8 character!');
        }
        else if (pass1 !== pass2) {
            message.error('2 password is not correct!');
        }
        else {
            const { user } = this.state;
            if (user.firstname.trim().length === 0) {
                message.error('Firstname is needed to show your name!');
            }
            else {
                fetch(`${url}/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.token}`,
                    },
                    body: JSON.stringify(user),
                })
                    .then(res => res.json())
                    .then(item => message.success('Success!'))
                    .catch(err => console.log(err));
            }
        }
    }
    render() {
        return (
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <div style={{
                    fontSize: '20pt',
                    marginLeft: '29%',
                    marginBottom: '2%',
                    fontWeight: 'bold'
                }}>Your information</div>
                <div>
                    ID
		          <Input style={{ width: '75%', marginLeft: '5.4%' }}
                        placeholder="Please input name"
                        type="text"
                        value={this.state.user.id}
                        disabled
                    />
                </div>
                <div>
                    Email
		          <Input style={{ width: '75%', marginLeft: '3.7%' }}
                        placeholder="Please input email"
                        type="text"
                        value={this.state.user.email}
                        disabled
                    />
                </div>
                <div>
                    Firstname
		          <Input style={{ width: '75%', marginLeft: '1.55%' }}
                        placeholder="Please input firstname"
                        type="text"
                        value={this.state.user.firstname}
                        onChange={this.onChangeFirstname}
                    />
                </div>
                <div>
                    Lastname
		          <Input style={{ width: '75%', marginLeft: '1.65%' }}
                        placeholder="Please input lastname"
                        type="text"
                        value={this.state.user.lastname}
                        onChange={this.onChangeLastname}
                    />
                </div>
                <div>
                    Address
		          <Input style={{ width: '75%', marginLeft: '2.45%' }}
                        placeholder="Please input address"
                        type="text"
                        value={this.state.user.address}
                        onChange={this.onChangeAddress}
                    />
                </div>
                <div>
                    Phone
		          <Input style={{ width: '75%', marginLeft: '3.3%' }}
                        placeholder="Please input phone"
                        type="text"
                        value={this.state.user.phone}
                        onChange={this.onChangePhone}
                    />
                </div>
                <div>
                    Create at
		          <Input style={{ width: '75%', marginLeft: '1.9%' }}
                        placeholder="Please input create at"
                        type="text"
                        value={this.state.user.createat}
                        disabled
                    />
                </div>
                <br />
                <div>
                    Password
		          <Input style={{ width: '75%', marginLeft: '1.5%' }}
                        placeholder="Please input password"
                        type="password"
                        onChange={this.onChangePassword}
                        id="pass1" />
                </div>
                <div>
                    RetypePas
		          <Input style={{ width: '75%', marginLeft: '0.9%' }}
                        placeholder="Please input retype-password"
                        type="password"
                        id="pass2"
                    />
                </div>
                <Button style={{ marginLeft: '35%', marginTop: '2%' }}
                    type="primary"
                    onClick={this.edit}>Submit</Button>
            </Content>
        )
    }
}