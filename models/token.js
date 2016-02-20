// This file will store a user's token in the database as a hashed value for further security

var cryptojs = require('crypto-js');

module.exports = function (sequelize, Datatypes) {

	return sequelize.define('token', {
		token: {
			type: Datatypes.VIRTUAL, // A virtual datatype doesn't get stored in the database
			allowNull: false,
			validate: {
				len: [1]
			},
			set: function (value) {
				var hash = cryptojs.MD5(value).toString();

				this.setDataValue('token', value);
				this.setDataValue('tokenHash', hash);
			}
		},
		tokenHash: Datatypes.STRING // A string value will get stored in the database
	});

};