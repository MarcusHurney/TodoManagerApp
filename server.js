var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcrypt');
var middleware = require('./middleware.js')(db); // db specifies the database middleware.js will use

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

    res.send(__dirname + '/public/index.html');

});


// Gets all todos + todos with custom query such as search by completed status or description

app.get('/todos', middleware.requireAuthentication, function (req, res) {

	var query = req.query;
	var where = {
		userId: req.user.get('id')
	};

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

// Gets a todo by id

app.get('/todos/:id', middleware.requireAuthentication, function (req, res) {

	var todoId = parseInt(req.params.id, 10);

	db.todo.findOne({
		where: {
			userId: req.user.get('id'),
			id: todoId
		}
	}).then(function (todo) {
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, function (e) {
		res.status(500).send();
	});

});

// Adds a new todo item
app.post('/todos', middleware.requireAuthentication, function (req, res) {
	
	var body = _.pick(req.body, 'description', 'completed'); //_.pick will check the req.body for any unwanted properties and only keep description and completed.

	db.todo.create({
		description: body.description
	}).then(function (todo) {
		req.user.addTodo(todo).then(function () { //req.user is returned from middleware.requireAuthentication when a user is returned from db.user.findByToken
			return todo.reload(); //Reloads the todo with the new userID association in the todo item.
		}).then(function (todo) {
			res.json(JSON.stringify(todo)); //Returns the todo to the front end.
		});
	}, function (e) {
		res.status(400).json(e);
	});
	

});

//Deletes a todo item
app.delete('/todos/delete/:id', middleware.requireAuthentication, function (req, res) {

	var todoId = parseInt(req.params.id, 10);

	db.todo.destroy({
		where: {
			userId: req.user.get('id'),
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

//Updates a todo item

app.put('/todos/update/:id', middleware.requireAuthentication, function (req, res) {

	var todoId = parseInt(req.params.id, 10);
	

	var body = _.pick(req.body, 'description', 'completed');
	var attributes = {};


	if (body.hasOwnProperty('completed')) {

		attributes.completed = body.completed;

	} 

	if (body.hasOwnProperty('description')) {

		attributes.description = body.description;

	}

	db.todo.findOne({
		where: {
			userId: req.user.get('id'),
			id: todoId
		}
	}).then(function (todo) {
		if (todo) {
			todo.update(attributes).then(function () {
				res.json(JSON.stringify(todo));
			}, function (e) {
			res.status(400).json(e);
		}); 

		} else {
			res.status(404).send();
		}
	}, function () {
		res.status(500).send();
	});


});

// Adds user to the database, doesn't require middleware.requireAuthentication because you are adding a new user.

app.post('/users', function (req, res) {
	var body = _.pick(req.body, 'email', 'password'); // _.pick keeps only email and password queries

	db.user.create({
		email: body.email,
		password: body.password
	}).then(function (user) {
		res.status(200).json(user.toPublicJSON()); // toPublicJSON() is the custom instance method defined over in user.js, it returns only the specific attributes for the the new user, keeping some private.
	}, function (e) {
		res.status(400).send();
	});
});

// POST /users/login -- Logs in a user, doesn't require middleware.requireAuthentication because you are adding a new user.

app.post('/users/login', function (req, res) {

	var body = _.pick(req.body, 'email', 'password');

	db.user.authenticate(body).then(function (user) {
		var token = user.generateToken('authentication');

		if (token) {
			res.header('Auth', token).json(user.toPublicJSON()); //header takes two values, the key and the value, --> Auth: the returned data from generateToken
		} else {
			res.status(401).send();
		}
		
	}, function (e) {
		res.status(401).send();
	});

});



// Sync with sequelize database using the imported db.js

db.sequelize.sync({force:true}).then(function () {

	app.listen(PORT, function () {
		console.log('Express listening on port ' + PORT + '!');
	});

});
