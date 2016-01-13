module.exports = function (sequelize, Datatypes) {
	return sequelize.define('user', {
		email: {
			type: Datatypes.STRING,
			allowNull: false,
			unique: true, //Makes sure that there are no other users in the database with this email field
			validate: {
				isEmail: true
			}
		},
		password: {
			type: Datatypes.STRING,
			allowNull: false,
			validate: {
				len: [7, 100]
			}
		}
	});
};