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

		if (!todo) {
			return (
				<h3>Loading...</h3>
			);
		}

		return (
			<div className="input-group">
				<Link to="/todos_index">Back</Link>
				<h3>Title</h3>
				<input 
					type="text" 
					className="form-control"
					value={this.state.newTitle}
					onChange={this.handleTitleChange} />
				<textarea 
					className="form-control" 
					value={this.state.newDescription}
					onChange={this.handleDescriptionChange}>
				</textarea>
				<span className="input-group-addon">
				    <input type="checkbox"
				      onChange={this.handleDoneChange} />
		  		</span>
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
	}

	handleTitleChange(event) {
		this.setState({
			descriptionChanged: true,
			newTitle: event.target.value
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

	handleSaveClick() {
		var props = {
			title: this.state.newTitle,
			description: this.state.newDescription
		};
		this.props.updateTodo(this.state.id, JSON.stringify(props)).then(() => {
			this.context.router.push('/todos_index');
		});
	}

	handleUndoClick() {
		this.setState({
			descriptionChanged: false,
			newTitle: this.props.todo.title,
			newDescription: this.props.todo.description

		});
	}
}

function mapStateToProps(state) {
	return { todo: state.todos.todo };
}

export default connect(mapStateToProps, { fetchTodo, updateTodo, deleteTodo })(ShowTodo);


