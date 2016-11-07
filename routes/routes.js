var express =  require('express'),
	router = express.Router(),
	User = require('../models/user');

router.get('/', function(req, res){
	console.log(req.session.user_id);
	res.render('index');
});

router.get('/login', function(req, res){
	res.render('login');
});

router.get('/signup', function(req, res){
	res.render('signup');
});

router.post('/users', function(req, res){
	var user = User({username: req.fields.username, email: req.fields.email, password: req.fields.password, password_2: req.fields.password_2});
	user.save().then(function(new_user){
		console.log("Registrado con exito un usuario con id: " + new_user._id);
		res.redirect('login');
	}, function(err){
		console.log(String(err));
		res.redirect('signup');
	});
});

router.post('/sessions', function(req, res){
	User.findOne({email: req.fields.email, password: req.fields.password}).
	then(function(user){
		if(user){
			req.session.user_id = user._id;
			res.redirect('/app');
		}else{
			res.redirect('/login');
		}
	}, function(err){
		console.log(String(err));
		res.redirect('/login');
	});
});

router.get('/logout', function(req, res){
	if(req.session.user_id){
		console.log("FIN DE SESSIÓN PARA: " + req.session.user_id);
		req.session.user_id = 'undefined';
		res.redirect('/');
	}else{
		console.log("ERROR AL CERRAR SESIÓN");
		res.redirect('/');
	}
});

module.exports = router;