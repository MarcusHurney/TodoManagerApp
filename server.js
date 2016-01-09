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

// GET/todos/:id -- Gets a todo by id

app.get('/todos/custom', function (req, res) {

	var todoId = parseInt(req.query.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (matchedTodo) {

		res.json(matchedTodo);

	} else {

		res.json('No todo with that id');

	}

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

	res.json(body); //Sends the body back to the front-end.

});

app.delete('/todos/delete', function (req, res) {

	var todoId = parseInt(req.query.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (!matchedTodo) {

		res.status(404).json({"error": "No todo with that id"});

	} else {

		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
		
	}

	
});


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});