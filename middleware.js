var cryptojs = require('crypto-js');

module.exports = function (db) {

	return {
		requireAuthentication: function (req, res, next) { // next allows the correlated function in server.js to run, middleware comes before anything is handled on the back-end.
			var token = req.get('Auth') || ''; //This pulls the token out of the request header by specifying the key called 'Auth' as defined in the header in /users/login in server.js

			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString() //This looks for the hashed version of the user's virtual token, because it is stored as an MD5 hashed value(hashedToken) in the database.
				}
			}).then(function (tokenInstance) {

				if (!tokenInstance) {
					throw new Error(); //This will trigger the catch block below
				}

				//if there is a token it will be sent back in the request object
				req.token = tokenInstance;
				return db.user.findByToken(token);

			}).then(function (user) { //This then block will get called if findByToken is successful
				req.user = user; //The user instance returned from the database is set in the request
				next();
			}).catch(function () {
				res.status(401).send();
			});



			// db.user.findByToken(token).then(function (user) { //findByToken decryptes the token data and returns the user.
			// 	req.user = user;
			// 	next(); // sends along the user in the request which will then be used in server.js
			// }, function () {
			// 	res.status(401).send();
			// });
		}
	};

};