import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import LogoutHeader from './LogoutHeader';
import { createTodo } from '../actions/index';
import { logoutUser } from '../actions/index';

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

				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<h3>Create a New Todo</h3>

					<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
						<label>Title</label>
						<input type="text" className="form-control" {...title} />
						<div className="text-help">
							{title.touched ? title.error : ''}
						</div>
					</div>

					<div className={`form-group ${description.touched && description.invalid ? 'has-danger' : ''}`}>
						<label>Description</label>
						<textarea className="form-control" {...description} />
						<div className="text-help">
							{description.touched ? description.error : ''}
						</div>
					</div>

					<button type="submit" className="btn btn-primary">Add</button>
					<Link to="/todos_index" className="btn btn-danger">Cancel</Link>
					<button className="btn btn-default" onClick={this.handleLogout.bind(this)}>Logout</button>
				</form>

			</div>
		);
	}


}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Please enter a title';
	}

	if (!values.description) {
		errors.description = 'Please enter your description';
	}

	return errors;
}

export default reduxForm({
	form: 'NewTodoForm',
	fields: ['title', 'description'],
	validate								   //These configurations will be added to the application state, so reduxForm is very similar to the connect function.
											   //connect: first argument is mapStateToProps, second is mapDispatchToProps
											   //reduxForm: 1st is form configuration, 2nd is mapStateToProps, 3rd is mapDispatchToProps

}, null, { createTodo, logoutUser })(NewTodo);

