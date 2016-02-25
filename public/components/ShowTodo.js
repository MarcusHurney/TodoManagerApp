import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LogoutHeader from './LogoutHeader';
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
			<div id="showTodo">

			<Link id="btnBack" className="btn btn-custom" role="button" to="/todos_index"><span className="glyphicon glyphicon-arrow-left"></span></Link>

				<LogoutHeader></LogoutHeader>

					<div className="row">

	        			<div className="col-md-6 col-md-offset-3">

						
								<h3>Edit Todo</h3>
									<div className="form-group">
										<label>Title</label>
										<input 
											type="text" 
											className="form-control"
											value={this.state.newTitle}
											onChange={this.handleTitleChange} />
									</div>
									<div className="form-group">
										<label>Description</label>
										<textarea 
											className="form-control" 
											value={this.state.newDescription}
											onChange={this.handleDescriptionChange}>
										</textarea>
									</div>
							
							<span className="input-group-btn">
								{this.changeButtons()}
								<a onClick={this.handleDeleteClick} className="btn btn-danger" role="button"><span className="glyphicon glyphicon-trash"></span></a>
							</span>

						</div>
					
					</div>
			</div>
		);
	}

	changeButtons() {

		if (!this.state.descriptionChanged) {
			return null;
		} else {

			return [
			<button 
			  className="btn btn-success"
			  onClick={this.handleSaveClick}
			  ><span className="glyphicon glyphicon-floppy-save"></span></button>,
			<button 
			  className="btn btn-primary"
			  onClick={this.handleUndoClick}
			  ><span className="glyphicon glyphicon-refresh"></span></button>
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


