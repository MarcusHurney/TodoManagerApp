var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false

 }, {
 	id: 3,
 	description: 'Feed junior',
 	completed: false
 }];

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


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});