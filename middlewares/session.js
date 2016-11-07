var User = require('../models/user');

module.exports = function(req, res, next){
	if(!req.session.user_id){
		res.redirect('/');
	}else{
		User.findById(req.session.user_id).then(function(user){
			res.locals = {user : user};
			next();
		},function(err){
			res.redirect('/');
		});
	}
}