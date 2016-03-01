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
			textChanged: false
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
				<label>Title</label>
				<input type="text" onChange={this.titleChange} value={this.state.todoTitle} />
				<label>Description</label>
				<textarea type ="text" onChange={this.descriptionChange} value={this.state.todoDescription}></textarea>

				<button id="editTodoSave" className="btn btn-custom" onClick={this.handleSaveClick}><span className="glyphicon glyphicon-floppy-save"></span></button>
				<button id="editTodoRefresh" className="btn btn-custom" onClick={this.handleUndoClick}><span className="glyphicon glyphicon-refresh"></span></button>
				<button id="editTodoDelete" className="btn btn-custom" onClick={this.handleDeleteClick}><span className="glyphicon glyphicon-trash"></span></button>
			</div>
		)
	},

	titleChange: function (event) {
		this.setState({
			todoTitle: event.target.value,
			textChanged: true
		});
		console.log('Title Changed!');
	},

	descriptionChange: function (event) {
		this.setState({
			todoDescription: event.target.value,
			textChanged: true
		});
		console.log("Description Changed!");
	},

	handleSaveClick: function () {

		console.log("Handle Save Click Called!");

		var props = {
			title: this.state.todoTitle,
			description: this.state.todoDescription
		};

		this.props.updateTodo(this.state.id, JSON.stringify(props)).then(() => {
			alert("Todo updates should have been recieved in database");
			// this.context.router.push('/todos_index');
		});

	},

	handleDeleteClick: function () {
		console.log("Handle Delete Click Called!");
		this.props.deleteTodo(this.state.id).then(() => {
			// this.context.router.push('/todos_index');
			alert("Now it would push back to todos index because you deleted the todo");
		});
	},

	handleUndoClick: function () {
		console.log("Handle Undo Got Called!");

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