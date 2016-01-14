var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function (sequelize, Datatypes) {
	var user = sequelize.define('user', { //Declaring user as a variable let's us use user inside the classMethods
		email: {
			type: Datatypes.STRING,
			allowNull: false,
			unique: true, //Makes sure that there are no other users in the database with this email field
			validate: {
				isEmail: true
			}
		},
		salt: {
			type: Datatypes.STRING
		},
		password_hash: {
			type: Datatypes.STRING
		},
		password: {
			type: Datatypes.VIRTUAL,
			allowNull: false,
			validate: {
				len: [7, 100]
			},
			set: function (value) {
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value); //Sets the value of the user fields above with the variables in this set function: value, salt, hashedPassword
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword);
			}
		}
	},
	{
		hooks: {
			beforeValidate: function (user, options) {
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}
			}
		},
		classMethods: {
			authenticate: function (body) {
				return new Promise(function (resolve, reject) {

					var userEmail = body.email;
					var userPassword = body.password;

					if (typeof userEmail !== 'string' || typeof userPassword !== 'string') {
						return reject(); //note that return stops execution
					}

					user.findOne({ //User here is referencing the user variable at the top
						where: {
							email: userEmail
						}
					}).then(function (user) {
						if (!user || !bcrypt.compareSync(userPassword, user.get('password_hash'))) { //bcrypt.compareSync compares the user's password that was sent from the front end with password_hash set in the user model. Here we use ! to say if it is not a match then return 401.
							return reject(); //The 401 status is handled in POST in server.js
						}

						resolve(user); //toPublicJSON will be handled in server.js

					}, function () {
						reject();
					});

				});
			}
		},
		instanceMethods: {
			toPublicJSON: function () {
				var json = this.toJSON();
				return _.pick(json,'id', 'email', 'createdAt', 'updatedAt');
			},
			generateToken: function (type) {
				if (!_.isString(type)) {
					return undefined;
				}

				try {
					var stringData = JSON.stringify({id: this.get('id'), type: type}); // We declare this variable because AES.encrypt can only take a string.
					var encryptedData = cryptojs.AES.encrypt(stringData, 'abc123').toString(); // Returns encrypted ID and secret as a string.
					var token = jwt.sign({
						token: encryptedData
					}, 'qwerty098');
					console.log(token);
					return token;

				} catch (e) {
					return undefined;
				}
			}
		}
	});

	return user; //Exports the user model
};
































