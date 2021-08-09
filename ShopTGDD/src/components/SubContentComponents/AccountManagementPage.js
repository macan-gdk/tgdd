import React from 'react';
import AccountForm from './AccountForm';
import {connect} from 'react-redux';
import {updateUser} from '../../api/user';
import {Redirect} from 'react-router-dom';

class AccountManagement extends React.Component {
	render() {
		if (!localStorage.token) {
			return <Redirect to="/" />
		}
	    return (
	      <AccountForm onUpdate={(data) => this.props.updateUser(data)} user={this.props.user}/>
	    );
	}
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    updateUser(data) {
      updateUser(dispatch, data)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);