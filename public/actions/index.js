import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_TODOS = 'FETCH_TODOS';
export const CREATE_TODO = 'CREATE_TODO';
export const FETCH_TODO = 'FETCH_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const LOGOUT_USER = 'LOGOUT_USER';

export function createUser(props) {

	const request = axios.post(`/users`, props);

	return request.then((response) => {

		return {
			type: CREATE_USER,
			payload: request
		};

	}, (response) => {
		console.log("Error block in createUser has been reached.", response);
		throw new Error(response);
	});

	
}

export function loginUser(props) {

	const request = axios.post(`/users/login`, props);

	return request.then((response) => {

		var token = response.headers.auth;
		localStorage.setItem('token', token); //The user's token is taken from the reponse and set in local storage as 'token'
		console.log('Token: ', localStorage.getItem('token'));

		return {
			type: LOGIN_USER,
			payload: request
		};

	}, (response) => {
		console.log("Error block in loginUser has been reached", response);
		throw new Error(response);
	});

}

export function fetchTodos() {

	var config = {headers: {'Auth' : localStorage.getItem('token')}};

	const request = axios.get(`/todos`, config); //'token' is passed along in the request via config object

	return {
		type: FETCH_TODOS,
		payload: request
	};
}

export function createTodo(props) {

	var config = {headers: {'Auth' : localStorage.getItem('token')}};

	const request = axios.post(`/todos`, props, config);


	return {
		type: CREATE_TODO,
		payload: request
	};
}

export function fetchTodo(id) {

	var config = {headers: {'Auth' : localStorage.getItem('token')}};

	const request = axios.get(`/todos/${id}`, config);

	return {
		type: FETCH_TODO,
		payload: request
	};

}

export function updateTodo(id, props) {

	var config = {headers: {'Auth' : localStorage.getItem('token'),
							'Content-Type' : 'application/json'}};

	const request = axios.put(`/todos/update/${id}`, props, config);

	return {
		type: UPDATE_TODO,
		payload: request
	};
}

export function deleteTodo(id) {

	var config = {headers: {'Auth' : localStorage.getItem('token')}};

	const request = axios.delete(`/todos/delete/${id}`, config);

	return {
		type: DELETE_TODO,
		payload: request
	};
}

export function logoutUser() {

	var config = {headers: {'Auth' : localStorage.getItem('token')}};

	const request = axios.delete(`/users/login`, config);

	return {
		type: LOGOUT_USER,
		payload: request
	};
}






