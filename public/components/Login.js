import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createUser } from '../actions/index';
import { loginUser } from '../actions/index';
import { Link } from 'react-router';

class Login extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.createUser(props).then(() => {
				this.props.loginUser(props).then(() => {
				//User has been created, navigate user to "/"
				//We navigate by calling this.context.router.push with the new path for navigation
				this.context.router.push('/todos_index');
			});
		})
		
	}

	render() {
		const { fields: {email, password}, handleSubmit } = this.props;
		// const title = this.props.fields.email in ES5
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a New User</h3>

				<div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
					<label>Email</label>
					<input type="text" className="form-control" {...email} />
					<div className="text-help">
						{email.touched ? email.error : ''}
					</div>
				</div>

				<div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
					<label>Password</label>
					<input type="password" className="form-control" {...password} />
					<div className="text-help">
						{password.touched ? password.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.email) {
		errors.email = 'Please enter a email';
	}

	if (!values.password) {
		errors.password = 'Please enter a password';
	}

	return errors;
}


export default reduxForm({
	form: 'CreateNewUser',
	fields: ['email', 'password'],
	validate								   //These configurations will be added to the application state, so reduxForm is very similar to the connect function.
											   //connect: first argument is mapStateToProps, second is mapDispatchToProps
											   //reduxForm: 1st is form configuration, 2nd is mapStateToProps, 3rd is mapDispatchToProps

}, null, { createUser, loginUser })(Login);