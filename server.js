var express = require('express');
var bodyParser = require('body-parser');

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

	var id = parseInt(req.query.id, 10);
	var matchedTodo;

	todos.forEach(function (todo) {

		if (id === todo.id) {
			matchedTodo = todo;
		} 

	});

	if (matchedTodo) {

		res.json(matchedTodo);

	} else {

		res.json('No todo with that id');

	}

});

// POST /todos
app.post('/todos', function (req, res) {
	
	var body = req.body;

	body.id = todoNextId++; //Adds id property to the new todo object and increments id.

	todos.push(body); //Pushes new todo object into the todos array.

	res.json(body); //This is returning an empty object

});


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});