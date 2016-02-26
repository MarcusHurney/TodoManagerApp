import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';

class LoginHeader extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.loginUser(props).then(() => {
			//We navigate by calling this.context.router.push with the new path for navigation
			this.context.router.push('/todos_index');
		});
		
	}

	render() {

		const { fields: {email, password}, handleSubmit } = this.props;

		return (

			<div id="loginHeader">

				<div className="navbar navbar-default navbar-fixed-top">

					<div className="container">

						<div className="navbar-header">

				          <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				            <span className="icon-bar"></span>
				            <span className="icon-bar"></span>
				            <span className="icon-bar"></span>
				          </button>
				          <a className="navbar-brand logo">Todo Manager</a>

			        	</div>

				        <div className="collapse navbar-collapse">

					        <form className="navbar-form navbar-right" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				          
						          <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
						           
						            <input type="email" name="loginEmail" id="loginEmail" placeholder="Email" className="form-control marginRight" {...email} />

						          </div>

						          <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`} >

						            <input type="password" name="loginPassword" id="loginPassword" placeholder="Password" className="form-control marginRight" {...password} />

						          </div>

						          <input type="submit" name="submit" className="btn btn-custom" value="Log In" />

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

	return errors;
}

export default reduxForm({
	form: 'LoginNewUser',
	fields: ['email', 'password'],
	validate								   //These configurations will be added to the application state, so reduxForm is very similar to the connect function.
											   //connect: first argument is mapStateToProps, second is mapDispatchToProps
											   //reduxForm: 1st is form configuration, 2nd is mapStateToProps, 3rd is mapDispatchToProps

}, null, { loginUser })(LoginHeader);