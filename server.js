var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

    res.send(__dirname + '/public/index.html');

});


// GET /todos -- Gets all todos

app.get('/todos', function (req, res) {
	res.json(todos);
});

// GET/todos/custom -- Gets a todo by id

app.get('/todos/custom', function (req, res) {

	var filteredTodos = todos;

	if (req.query.hasOwnProperty('id')) {

		var todoId = parseInt(req.query.id, 10);
		filteredTodos = _.findWhere(todos, {id: todoId});

		if (!filteredTodos) {

			res.status(404).json({"error": "No todo with that id"});

		} else {

			res.json(filteredTodos);

		}

	} else if (req.query.hasOwnProperty('completed') && req.query.completed === 'true') {

		filteredTodos = _.where(filteredTodos, {completed: true}); 

	} else if (req.query.hasOwnProperty('completed') && req.query.completed === 'false') {

		filteredTodos = _.where(filteredTodos, {completed: false});
		
	} else if (req.query.hasOwnProperty('q') && req.query.q.trim().length > 0) {

		filteredTodos = _.filter(filteredTodos, function (todo) {
			return todo.description.toLowerCase().indexOf(req.query.q.toLowerCase()) > -1; //Returns any todo item whose description contains the request query (string) contained in q. Since _.filter returns an array of these items, if their index is > -1, they exist.
		});
	}

	res.json(filteredTodos);

});

// POST /todos
app.post('/todos', function (req, res) {
	
	var body = _.pick(req.body, 'description', 'completed'); //_.pick will check the req.body for any unwanted properties and only keep description and completed.

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim(); //Deletes any unecessary spaces at the beginning or end of the description.

	body.id = todoNextId++; //Adds id property to the new todo object and increments id.

	todos.push(body); //Pushes new todo object into the todos array.

	res.json(JSON.stringify(body)); //Sends the body back to the front-end.
	

});

app.delete('/todos/delete', function (req, res) {

	var todoId = parseInt(req.query.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (!matchedTodo) {

		res.status(404).json({"error": "No todo with that id"});

	} else {

		todos = _.without(todos, matchedTodo);
		res.json(JSON.stringify(matchedTodo));
		
	}

	
});

app.put('/todos/update', function (req, res) {

	var todoId = parseInt(req.query.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).send();
	}


	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {

		validAttributes.completed = body.completed;

	} else if (body.hasOwnProperty('completed')) {

		return res.status().send();

	} // Validates completed property

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {

		validAttributes.description = body.description;

	} else if (body.hasOwnProperty('description')) {

		return res.status(400).send();

	} // Validates description property

	_.extend(matchedTodo, validAttributes); //Takes the properties from validAttributes and sets them to the matchedTodo
	res.json(JSON.stringify(matchedTodo)); //Returns updated todo item to the front-end.

});


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});