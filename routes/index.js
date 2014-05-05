// Homepage
exports.index = function(req, res) {
	res.render('index',{title: 'Welcome'});
};

// User list
exports.userlist = function(db) {
	return function(req, res) {
		var collection = db.get('userCollection');
		collection.find({}, {}, function(e, docs){
			res.render('userlist', {
				"userlist": docs,
				title: 'User List'
			});
		});
	};
};

// Add User Form
exports.adduser = function(db){
	return function(req,res){
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var username = req.body.username;
		var email = req.body.email;
		var password = req.body.password;

		// Set collection
		var collection = db.get('userCollection');

		// Submit to the DB
		collection.insert({
			"first_name" : first_name,
			"last_name" : last_name,
			"username" : username,
			"email" : email,
			"password" : password
		}, function(err, doc){
			if(err){
				res.send("There was a problem");
			} else {
				res.location('userlist');
				res.redirect('userlist');
			}
		});
	};
};