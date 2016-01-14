module.exports = function (db) {

	return {
		requireAuthentication: function (req, res, next) { // next allows the correlated function in server.js to run, middleware comes before anything is handled on the back-end.
			var token = req.get('Auth'); //This pulls the token out of the request header by specifying the key called 'Auth' as defined in the header in /users/login in server.js
			db.user.findByToken(token).then(function (user) { //findByToken decryptes the token data and returns the user.
				req.user = user;
				next(); // sends along the user in the request which will then be used in server.js
			}, function () {
				res.status(401).send();
			});
		}
	};

};