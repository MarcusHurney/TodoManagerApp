import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchTodos } from '../actions/index';

class TodosIndex extends Component {

	componentWillMount() {
		this.props.fetchTodos();
	}

	renderTodos() {

		if (this.props.todos.length === 0) {

			return <li>No todos for your account. Please add a todo!</li>;
			
		} else {

			return this.props.todos.map((todo) => {
				return (
					<Link to={"todo/" + todo.id} key={todo.id}>
						<li className="list-group-item">
							<p className="pull-xs-right">{todo.title} {todo.createdAt}</p>
						</li>
					</Link>
				);
			});

		}
		
	}

	render() {
		return (
			<div>
				<div className="text-xs-right">
					<Link to="/new_todo" className="btn btn-primary">
						Add a Todo
					</Link>
				</div>
				<h3>Todos</h3>
				<ul className="list-group">
					{this.renderTodos()}
				</ul>
			</div>
		);
	}

}

function mapStateToProps(state) {
	return { todos: state.todos.all};
}


export default connect(mapStateToProps, { fetchTodos })(TodosIndex);