import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LogoutHeader from 'LogoutHeader';
import TodoItem from 'TodoItem';
import { fetchTodos } from 'Actions';

class TodosIndex extends Component {

	componentWillMount() {
		this.props.fetchTodos();
	}

	renderTodos() {

		if (this.props.todos.length === 0) {

			return (
				<div id="noTodosIndex">
					<div className="row">
					  <div className="col-md-6 col-md-offset-3">
					    <div id="noTodosThumbnail" className="thumbnail">
						    <Link to="/new_todo"><span id="firstTodoIcon" className="glyphicon glyphicon-copy"></span></Link>
						    <div class="caption">
						    	<p>Write your first</p>
						    	<h3>Todo Item</h3>
						    </div>
					    </div>
					  </div>
					</div>

				</div>

			);
			
		} else {

			return this.props.todos.map((todo) => {
				return (
					<div id="hasTodosIndex">

						<TodoItem title={todo.title} createdAt={todo.createdAt} id={todo.id} completed={todo.completed} />

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
			<div id="addTodo">
				<h3>Your Todos</h3>

				<Link to="/new_todo" id="addBtn"><span className="glyphicon glyphicon-plus"></span> Add Todo</Link>
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