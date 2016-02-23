import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Login from './components/Login';
import TodosIndex from './components/TodosIndex';
import NewTodo from './components/NewTodo';
import ShowTodo from './components/ShowTodo';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Login} />
		<Route path="/todos_index" component={TodosIndex} />
		<Route path="/new_todo" component={NewTodo} />
		<Route path="/todo/:id" component={ShowTodo} />
	</Route>
);