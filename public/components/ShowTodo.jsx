import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import LogoutHeader from 'LogoutHeader';
import { fetchTodo, updateTodo, deleteTodo } from 'Actions';
import { Link } from 'react-router';

class ShowTodo extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			descriptionChanged: false,
			newDescription: '',
			newTitle: '',
			done: false,
			id: 0
		};
		

		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.changeButtons = this.changeButtons.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.handleUndoClick = this.handleUndoClick.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDoneChange = this.handleDoneChange.bind(this);
	}

	componentWillMount() {
		this.props.fetchTodo(this.props.params.id).then(() => {

			this.setState({
				newDescription: this.props.todo.description,
				newTitle: this.props.todo.title,
				done: this.props.todo.completed,
				id: this.props.todo.id
			}); 
				
		});
	}

	render() {

		const { todo } = this.props;
		const { fields: {title, description}, handleSubmit } = this.props;

		console.log("Fields: description: ", this.props.fields.description.value); //These values change as expected
		console.log("Fields: title: ", this.props.fields.title.value);
	

		if (!todo) {
			return (
				<h3>Loading...</h3>
			);
		}

		return (
			<div id="showTodo">

			<Link id="btnBack" className="btn btn-custom" role="button" to="/todos_index"><span className="glyphicon glyphicon-arrow-left"></span></Link>

				<LogoutHeader></LogoutHeader>

					<div className="row">

	        			<div className="col-md-6 col-md-offset-3">

								<form onSubmit={handleSubmit(this.handleSaveClick)}>
									<h3>Edit Todo</h3>
									<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
										<label>Title</label>
										<input 
											type="text" 
											className="form-control"
											value={this.state.newTitle}
											onChange={this.handleTitleChange}
											{...title} />
									</div>
									<div className="text-help">
										{description.touched ? description.error : ''}
									</div>
									<div className={`form-group ${description.touched && description.invalid ? 'has-danger' : ''}`}>
										<label>Description</label>
										<textarea
											className="form-control" 
											value={this.state.newDescription}
											onChange={this.handleDescriptionChange}
											{...description} >
										</textarea>
									</div>
									<div className="text-help">
										{description.touched ? description.error : ''}
									</div>
									<span className="input-group-btn">
										{this.changeButtons()}
										<button id="editTodoDelete" className="btn btn-custom" onClick={this.handleDeleteClick}><span className="glyphicon glyphicon-trash"></span></button>
									</span>
								</form>

						</div>
					
					</div>
			</div>
		);
	}

	changeButtons() { //This does not get called when there are changed in the input or textareas.

		if (!this.state.descriptionChanged) {
			return null;
		} else {

			return [
			<button
			  type="submit"
			  id="editTodoSave"
			  className="btn btn-custom"
			  ><span className="glyphicon glyphicon-floppy-save"></span></button>,
			<button
			  id="editTodoRefresh"
			  className="btn btn-custom"
			  onClick={this.handleUndoClick}
			  ><span className="glyphicon glyphicon-refresh"></span></button>
		   ];
		}
	}

	handleDescriptionChange(event) { //This does not get called when there is a change in the textarea
		this.setState({
			descriptionChanged: true,
			newDescription: this.props.fields.description.value
		});
		
	}

	handleTitleChange(event) { //This does not get called when there is a changed in the input field.

		this.setState({
			descriptionChanged: true,
			newTitle: this.props.fields.title.value
		});

	}

	handleDoneChange() {

		this.setState({
			done: !this.state.done
		});

		var props = {
			completed: this.state.done
		};

		this.props.updateTodo(this.state.id, JSON.stringify(props));

	}

	handleDeleteClick() {
		this.props.deleteTodo(this.state.id).then(() => {
			this.context.router.push('/todos_index');
		});
	}

	handleSaveClick(props) {

		this.props.updateTodo(this.state.id, JSON.stringify(props)).then(() => {
			alert("Todo updates should have been recieved in database");
			this.context.router.push('/todos_index');
		});	
		
	}

	handleUndoClick() {

		this.setState({
			descriptionChanged: false,
			newTitle: this.props.todo.title,
			newDescription: this.props.todo.description,
			errors: {
				title: '',
				description: ''
			}

		});
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

function mapStateToProps(state) {
	return { todo: state.todos.todo };
}

export default reduxForm({
	form: 'ShowTodoForm',
	fields: ['title', 'description'],
	validate								   //These configurations will be added to the application state, so reduxForm is very similar to the connect function.
											   //connect: first argument is mapStateToProps, second is mapDispatchToProps
											   //reduxForm: 1st is form configuration, 2nd is mapStateToProps, 3rd is mapDispatchToProps

}, mapStateToProps, { fetchTodo, updateTodo, deleteTodo })(ShowTodo);




