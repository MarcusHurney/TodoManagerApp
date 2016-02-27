import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchTodos, updateTodo, deleteTodo } from '../actions/index';
import moment from 'moment';

class TodoItem extends Component {

	render() {

		var createdDate = moment(this.props.createdAt).format('MM-DD-YYYY');

		return (
			<div className="col-sm-6 col-md-4">
				<div key={this.props.id} className="thumbnail">
			      <span className="glyphicon glyphicon-ok"></span>
			      <div className="caption">
			        <h4>{this.props.title}</h4>
			        <p>{createdDate}</p>
			        <p><Link to={"todo/" + this.props.id} className="btn btn-custom btnEdit" role="button"><span className="glyphicon glyphicon-edit"></span></Link>
			        <a onClick={this.handleComplete.bind(this)} className="btn btn-custom btnComplete" role="button"><span className="glyphicon glyphicon-ok-circle"></span></a>
			        <a onClick={this.handleDelete.bind(this)} className="btn btn-custom btnDelete" role="button"><span className="glyphicon glyphicon-trash"></span></a></p>
			      </div>
			    </div>
			</div>
		);
	}

	handleDelete() {

		this.props.deleteTodo(this.props.id).then(() => {
			this.props.fetchTodos();
		});

	}

	handleComplete() {

		var props = {
			completed: true
		};

		this.props.updateTodo(this.props.id, JSON.stringify(props));
	}

}

export default connect(null, { fetchTodos, updateTodo, deleteTodo })(TodoItem);