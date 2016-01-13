var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	}); // This if statement should execute if the app is run on Heroku
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
	    'dialect': 'sqlite',
	    'storage': __dirname + '/data/practice-todo-api.sqlite'
    });
}



var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;