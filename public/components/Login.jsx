import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import LoginHeader from 'LoginHeader';
import { createUser } from 'Actions';
import { loginUser } from 'Actions';
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

			<div id="loginPage">

				<LoginHeader></LoginHeader>

				<div className="container contentContainer" id="topContainer">

      				<div className="row">

        				<div className="col-md-6 col-md-offset-3" id="topRow">

          					<h1 className="center">Todo Manager</h1>
         
          					<h4 className="bold marginTop center">Read and update your list of todos from anywhere</h4>
          					<p className="bold marginTop center">Interested? Sign up below</p>

							<form className="center" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

								<div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
									<label>Email</label>
									<input type="email" className="form-control" {...email} />
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

								<button type="submit" className="btn btn-custom">Sign Up</button>
							</form>
						</div>	
					</div>
				</div>
			</div>
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
	if (values.password && values.password.length < 7) {
		errors.password = 'Password must be at least 7 characters long';
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