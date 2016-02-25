import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LogoutHeader from './LogoutHeader';
import { fetchTodos } from '../actions/index';

class TodosIndex extends Component {

	componentWillMount() {
		this.props.fetchTodos();
	}

	renderTodos() {

		if (this.props.todos.length === 0) {

			return (
				<div id="noTodosIndex" className="center marginTop">

					<h3 className="bold">No todos for your account. Please add a todo!</h3>

					<Link to="/new_todo" className="btn btn-custom">
						Add a Todo
					</Link>

				</div>

			);
			
		} else {

			return this.props.todos.map((todo) => {
				return (
					<div id="hasTodosIndex">

						<div className="col-sm-6 col-md-4">
							<div className="thumbnail">
						      <span className="glyphicon glyphicon-ok"></span>
						      <div className="caption">
						        <h3>{todo.title}</h3>
						        <p>{todo.createdAt}</p>
						        <p><Link to={"todo/" + todo.id} key={todo.id} className="btn btn-primary btnEdit" role="button"><span className="glyphicon glyphicon-edit"></span></Link>
						        <a className="btn btn-success btnComplete" role="button"><span className="glyphicon glyphicon-ok-circle"></span></a>
						        <a className="btn btn-danger btnDelete" role="button"><span className="glyphicon glyphicon-trash"></span></a></p>
						      </div>
						    </div>
						</div>

				  </div>
				);
			});

		}
		
	}

	render() {
		return (
			<div id="todosIndex">

				<LogoutHeader></LogoutHeader>

				<h3>Todos</h3>

				<Link to="/new_todo" className="btn btn-custom">
					Add a Todo
				</Link>

	  			
					{this.renderTodos()}
				

			</div>
		);
	}

}

function mapStateToProps(state) {
	return { todos: state.todos.all};
}


export default connect(mapStateToProps, { fetchTodos })(TodosIndex);