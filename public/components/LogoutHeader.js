import React, { Component, PropTypes } from 'react';
import { logoutUser } from '../actions/index';
import { connect } from 'react-redux';

class LogoutHeader extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	handleLogout() {
		this.props.logoutUser().then(() => {
			this.context.router.push('/');
		});
	}

	render () {
		return (
			<div id="logoutHeader">

	        	<a onClick={this.handleLogout.bind(this)}>Logout</a>

        	</div>
		);
	}
}

export default connect(null, { logoutUser })(LogoutHeader);