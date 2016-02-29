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
			todoDescription: '',
			todoTitle: '',
			done: false,
			id: 0
		};
		
	}

	componentWillMount() {
		this.props.fetchTodo(this.props.params.id).then(() => {

			this.setState({    //Here this.state is given the values of the specific todo item feteched from the database.
				todoDescription: this.props.todo.description,
				todoTitle: this.props.todo.title,
				done: this.props.todo.completed,
				id: this.props.todo.id
			}); 
				
		});
	}

	render() {

		const { todo } = this.props;
		const { fields: {title, description}, handleSubmit } = this.props;

		console.log("State", this.state);
		console.log("Todo item in props (comes from Redux): ", this.props.todo);

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

								<form onSubmit={handleSubmit(this.handleSaveClick.bind(this))}>
									<h3>Edit Todo</h3>
									<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
										<label>Title</label>
										<input 
											type="text" 
											className="form-control"
											value={this.state.todoTitle}
											{...title} />
									</div>
									<div className="text-help">
										{title.touched ? title.error : ''}
									</div>
									<div className={`form-group ${description.touched && description.invalid ? 'has-danger' : ''}`}>
										<label>Description</label>
										<textarea
											className="form-control" 
											value={this.state.todoDescription}
											{...description} >
										</textarea>
									</div>
									<div className="text-help">
										{description.touched ? description.error : ''}
									</div>
									
										<button type="submit" id="editTodoSave" className="btn btn-custom"><span className="glyphicon glyphicon-floppy-save"></span></button>
										
								</form>

								<button id="editTodoRefresh" className="btn btn-custom" onClick={this.handleUndoClick.bind(this)}><span className="glyphicon glyphicon-refresh"></span></button>
								<button id="editTodoDelete" className="btn btn-custom" onClick={this.handleDeleteClick.bind(this)}><span className="glyphicon glyphicon-trash"></span></button>
						</div>
					
					</div>
			</div>
		);
	}


	handleDeleteClick() {

		console.log("Handle Delete Click got called!");

		this.props.deleteTodo(this.state.id).then(() => {
			this.context.router.push('/todos_index');
		});

	}

	handleSaveClick(props) {

		console.log("Handle Save Click got called!");

		this.props.updateTodo(this.state.id, JSON.stringify(props)).then(() => {
			alert("Todo updates should have been recieved in database");
			this.context.router.push('/todos_index');
		});	
		
	}

	handleUndoClick() {

		console.log("Handle Undo Got Called!");

		this.setState({ //This should change the values of the form back to the original values because the form takes its values from this.state
			todoTitle: this.props.todo.title,
			todoDescription: this.props.todo.description
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
