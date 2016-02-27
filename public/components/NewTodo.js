import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import LogoutHeader from './LogoutHeader';
import { createTodo } from '../actions/index';

class NewTodo extends Component {
	
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.createTodo(props).then(() => {
			//blog post has been created, navigate user to "/"
			//We navigate by calling this.context.router.push with the new path for navigation
			this.context.router.push('/todos_index');
		});
	}

	handleLogout() {
		this.props.logoutUser().then(() => {
			this.context.router.push('/');
		});
	}

	render() {
		const { fields: {title, description}, handleSubmit } = this.props;
		// const title = this.props.fields.title in ES5
		return (
			<div id="newTodo">

				<LogoutHeader></LogoutHeader>

				<div className="row">

	        		<div className="col-md-6 col-md-offset-3">

						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<h3>Create a New Todo</h3>

							<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
								<label>Title</label>
								<input type="text" className="form-control" placeholder="Max 25 Characters" {...title} />
								<div className="text-help">
									{title.touched ? title.error : ''}
								</div>
							</div>

							<div className={`form-group ${description.touched && description.invalid ? 'has-danger' : ''}`}>
								<label>Description</label>
								<textarea id="descriptionArea" className="form-control" placeholder="Max 500 characters" {...description} />
								<div className="text-help">
									{description.touched ? description.error : ''}
								</div>
							</div>

							<button type="submit" className="btn btn-custom"><span className="glyphicon glyphicon-plus"></span></button>
							<Link id="newTodoCancel" to="/todos_index">Cancel</Link>
				
						</form>

					</div>
				</div>
			</div>
		);
	}


}

function validate(values) {
	const errors = {};

	


	if (!values.title) {
		errors.title = 'Please enter a title';
	}

	if (values.title) {
		if (values.title.length > 25){
			errors.title = 'You exceeded 25 characters';
		}
		
	}

	if (!values.description) {
		errors.description = 'Please enter your description';
	}

	if (values.description) {
		if (values.description.length > 500) {
			errors.description = "You exceeded 500 characters";
		}
	}

	return errors;
}

export default reduxForm({
	form: 'NewTodoForm',
	fields: ['title', 'description'],
	validate								   //These configurations will be added to the application state, so reduxForm is very similar to the connect function.
											   //connect: first argument is mapStateToProps, second is mapDispatchToProps
											   //reduxForm: 1st is form configuration, 2nd is mapStateToProps, 3rd is mapDispatchToProps

}, null, { createTodo })(NewTodo);

