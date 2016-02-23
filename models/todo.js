module.exports = function (sequelize, Datatypes) {
	return sequelize.define('todo', {
		description: {
			type: Datatypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		completed: {
			type: Datatypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		title: {
			type: Datatypes.STRING,
			allowNull: false,
			validate:{
				len: [1, 30]
			}
		}
	});
};

//When formatting a file to be used by sequelize.import(db.js), this is how it should be done.