import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LogoutHeader from './LogoutHeader';
import TodoItem from './TodoItem';
import { fetchTodos } from '../actions/index';

class TodosIndex extends Component {

	componentWillMount() {
		this.props.fetchTodos();
	}

	renderTodos() {

		if (this.props.todos.length === 0) {

			return (
				<div id="noTodosIndex" className="center setPageMiddle">

					<h2 className="bold">No todos for your account. Add a todo to get started!</h2>

					<Link to="/new_todo" className="btn btn-custom marginTop">
						Add a Todo
					</Link>

				</div>

			);
			
		} else {

			return this.props.todos.map((todo) => {
				return (
					<div id="hasTodosIndex">

						<TodoItem title={todo.title} createdAt={todo.createdAt} id={todo.id} />

				    </div>
				);
			});

		}
		
	}

	renderAddBtn() {

		if (this.props.todos.length === 0) {
			return null;
		}

		return (
			<div id="addBtn">
				<h3>Todos</h3>

				<Link to="/new_todo" className="btn btn-custom">
					Add a Todo
				</Link>
			</div>
		);
	}

	render() {
		return (

			<div id="todosIndex">

				<LogoutHeader></LogoutHeader>

	  				{this.renderAddBtn()}

					{this.renderTodos()}
				
			</div>

		);
	}

}

function mapStateToProps(state) {
	return { todos: state.todos.all};
}


export default connect(mapStateToProps, { fetchTodos })(TodosIndex);