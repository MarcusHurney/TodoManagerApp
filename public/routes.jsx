import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'App';
import Login from 'Login';
import TodosIndex from 'TodosIndex';
import NewTodo from 'NewTodo';
import ShowTodo from 'ShowTodo';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Login} />
		<Route path="/todos_index" component={TodosIndex} />
		<Route path="/new_todo" component={NewTodo} />
		<Route path="/todo/:id" component={ShowTodo} />
	</Route>
);