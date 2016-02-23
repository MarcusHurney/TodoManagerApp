import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTodo, updateTodo, deleteTodo } from '../actions/index';
import { Link } from 'react-router';

class ShowTodo extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			descriptionChanged: false,
			newDescription: '' // This is null when the component is constructed, so the build fails
		};
		

		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.changeButtons = this.changeButtons.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.handleUndoClick = this.handleUndoClick.bind(this);
	}

	componentWillMount() {
		this.props.fetchTodo(this.props.params.id).then(() => {
			this.setState({
				newDescription: this.props.todo.description
			});
		});
	}

	render() { 

		const { todo } = this.props;

		if (!todo) {
			return (
				<h3>Loading...</h3>
			);
		}

		return (
			<div className="input-group">
				<Link to="/todos_index">Back</Link>
				<h3>Title Goes Here After Database Setup</h3>
				<textarea 
					className="form-control" 
					value={this.state.newDescription}
					onChange={this.handleDescriptionChange}>
				</textarea>
				<span className="input-group-btn">
					{this.changeButtons()}
					<button onClick={this.handleDeleteClick} className="btn btn-danger pull-xs-right">Delete Post</button>
				</span>
				

			</div>
		);
	}

	changeButtons() {
		if (!this.state.descriptionChanged) {
			return null;
		} else {

			return [
			<button 
			  className="btn btn-default"
			  onClick={this.handleSaveClick}
			  >Save</button>,
			<button 
			  className="btn btn-default"
			  onClick={this.handleUndoClick}
			  >Undo</button>
		   ];
		}
	}

	handleDescriptionChange(event) {
		this.setState({
			descriptionChanged: true,
			newDescription: event.target.value
		});
		console.log('New description in state: ', this.state.newDescription);
	}

	handleDeleteClick(event) {
		this.props.deleteTodo(this.props.params.id).then(() => {
			this.context.router.push('/todos_index');
		});
	}

	handleSaveClick(event) {
		var id = this.props.params.id;
		var props = {
			description: this.state.newDescription
		};
		this.props.updateTodo(id, JSON.stringify(props)).then(() => {
			this.context.router.push('/todos_index');
		});
	}

	handleUndoClick() {
		this.setState({
			descriptionChanged: false,
			newDescription: this.props.todo.description
		});
	}
}

function mapStateToProps(state) {
	return { todo: state.todos.todo };
}

export default connect(mapStateToProps, { fetchTodo, updateTodo, deleteTodo })(ShowTodo);


