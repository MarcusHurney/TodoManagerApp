import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LogoutHeader from 'LogoutHeader';
import { fetchTodo, updateTodo, deleteTodo } from 'Actions';
import { Link } from 'react-router';

var ShowTodo = React.createClass({

	getInitialState: function () {
		return {
			todoDescription: null,
			todoTitle: null,
			done: null,
			id: null,
			textChanged: false,
			titleError: false,
			descriptionError: false
		};
	},
	componentWillMount: function() {
		this.props.fetchTodo(this.props.params.id).then(() => {

			this.setState({    //Here this.state is given the values of the specific todo item feteched from the database.
				todoDescription: this.props.todo.description,
				todoTitle: this.props.todo.title,
				done: this.props.todo.completed,
				id: this.props.todo.id
			}); 
				
		});
	},

	render: function () {
		console.log('rendering ShowTodo');

		return (
			<div>
				<Link id="btnBack" className="btn btn-custom" role="button" to="/todos_index"><span className="glyphicon glyphicon-arrow-left"></span></Link>
				<LogoutHeader></LogoutHeader>
				
				<div id="showTodo">

					<div className="row">
		        	<div className="col-md-6 col-md-offset-3">

		        		<div className="input-group">
							<label>Title</label>
							<input type="text" className="form-control" onChange={this.titleChange} value={this.state.todoTitle} />
						</div>
						<div className={`error ${this.state.titleError ? '' : 'hide'}`}>
							Please enter a title 25 characters or less
						</div>

						<div className="input-group">
							<label>Description</label>
							<textarea type ="text" className="form-control" onChange={this.descriptionChange} value={this.state.todoDescription}></textarea>
						</div>
						<div className={`error ${this.state.descriptionError ? '' : 'hide'}`}>
							Please enter a description 500 characters or less
						</div>

						<div class="btn-group" role="group" aria-label="update options">
							<button id="editTodoSave" className="btn btn-custom" onClick={this.handleSaveClick}><span className="glyphicon glyphicon-floppy-save"></span></button>
							<button id="editTodoRefresh" className="btn btn-custom" onClick={this.handleUndoClick}><span className="glyphicon glyphicon-refresh"></span></button>
							<button id="editTodoDelete" className="btn btn-custom" onClick={this.handleDeleteClick}><span className="glyphicon glyphicon-trash"></span></button>
						</div>

					</div>
					</div>

				</div>
			</div>
		);
	},

	titleChange: function (event) {
		this.setState({
			todoTitle: event.target.value,
			textChanged: true
		});
	},

	descriptionChange: function (event) {
		this.setState({
			todoDescription: event.target.value,
			textChanged: true
		});
	},

	handleSaveClick: function () {

		console.log("Handle Save Click Called!");

		var props = {
			title: this.state.todoTitle,
			description: this.state.todoDescription
		};

		if (props.title.length > 25 || props.title.length === 0) {

			this.setState({
				titleError: true
			});

			return null;

		} else if (props.description.length > 500 || props.description.length === 0) {

			this.setState({
				descriptionError: true
			});

			return null;
			
		} else {

			this.props.updateTodo(this.state.id, JSON.stringify(props)).then(() => {

				this.props.history.pushState(null, '/todos_index');

			});

		}

		

	},

	handleDeleteClick: function () {

		this.props.deleteTodo(this.state.id).then(() => {

			this.props.history.pushState(null, '/todos_index');
			
		});
	},

	handleUndoClick: function () {

		this.setState({ //This should change the values of the form back to the original values because the form takes its values from this.state
			todoTitle: this.props.todo.title,
			todoDescription: this.props.todo.description
		});
	}
	

});

function mapStateToProps (state) {

	return { todo: state.todos.todo };
	
}

export default connect(mapStateToProps, { fetchTodo, updateTodo, deleteTodo })(ShowTodo);