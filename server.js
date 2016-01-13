var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

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

	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('completed') && query.completed === 'true') {

		where.completed = true;

	} else if (query.hasOwnProperty('completed') && query.completed === 'false') {

		where.completed = false;

	} 

	if (query.hasOwnProperty('q') && query.q.trim().length > 0) {

		where.description = {
			$like: '%' + query.q + '%'
		};

	}

	db.todo.findAll({

		where: where

	}).then(function (todos) {

		res.json(todos);

	}, function (e) {

		res.status(500).send();

	});



});

// GET/todos/custom/:id -- Gets a todo by id

app.get('/todos/:id', function (req, res) {

	var todoId = parseInt(req.params.id, 10);

	db.todo.findById(todoId).then(function (todo) {
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, function (e) {
		res.status(500).send();
	});

});

// POST /todos
app.post('/todos', function (req, res) {
	
	var body = _.pick(req.body, 'description', 'completed'); //_.pick will check the req.body for any unwanted properties and only keep description and completed.

	db.todo.create({
		description: body.description
	}).then(function (todo) {
		res.status(200).json(JSON.stringify(todo));
	}, function (e) {
		res.status(400).json(e);
	});
	

});

app.delete('/todos/delete/:id', function (req, res) {

	var todoId = parseInt(req.params.id, 10);

	db.todo.destroy({
		where: {
			id: todoId
		}
	}).then(function (rowsDeleted) {
		if (rowsDeleted === 0) {
			res.status(404).json({
				error: 'No todo with that ID'
			});
		} else {
			res.status(204).send();
		}
	}, function (e) {
		res.status(500).send();
	});
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

// Sync with sequelize database using the imported db.js

db.sequelize.sync().then(function () {

	app.listen(PORT, function () {
		console.log('Express listening on port ' + PORT + '!');
	});

});
