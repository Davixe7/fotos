var express =  require('express'),
	Foto =  require('../models/foto'),
	fotoFinder =  require('../middlewares/find-image'),
	fs = require('fs'),
	router = express.Router(),
	redis = require('redis'),
	client = redis.createClient();

router.all('/fotos/:id*', fotoFinder);
	
router.get('/', function(req, res){
	Foto.find().populate('author').exec(function(err, fotos){
		res.render('app/home', {fotos:fotos});
	},function(){
		res.render('app/home');
	});
});

router.get('/removeAll', function(req, res){
	Foto.remove({}, function(){
		res.redirect('/app');
	});
});

router.get('/upload', function(req, res){
	res.render('app/upload');
});

router.get('/fotos/:id/edit', function(req, res){
	res.render('app/edit');
});

router.route('/fotos/:id').get(function(req, res){
	res.render('app/view');
}).put(function(req, res){
	
	console.log("Se está recibiendo una petición por PUT");
	
	Foto.update({_id:req.params.id}, {title:req.fields.title}).then(function(foto){
		foto.title = req.fields.title;
		res.redirect('/app');
	}, function(err){
		console.log(String(err));
		res.redirect('/app');
	});
}).delete(function(req, res){
	Foto.findByIdAndRemove(req.params.id).then(function(){
		res.redirect('/app');
	}, function(err){
		console.log(String(err));
		res.redirect('/app');
	});
});

router.route('/fotos').get(function(req, res){
	res.render('app/');
}).post(function(req, res){
	var extension = req.files.archivo.name.split('.').pop();
	var foto = Foto({title: req.fields.title, author: res.locals.user._id, extension: extension});
	
	var foto_json = {
		id: foto._id,
		title: foto.title,
		extension: foto.extension,
		author: res.locals.user.username
	}
	
	foto.save().then(function(new_foto){
		client.publish("fotos", JSON.stringify(foto_json));
		fs.rename(req.files.archivo.path, "public/imagenes/" + new_foto._id + "." + extension, function(err){
			if(err){
				console.log(err);
			}
			// res.redirect('/app/fotos/' + new_foto._id);
			res.redirect('/app');
		});
	}, function(err){
		console.log(String(err));
		res.redirect('/app');
	});
});

module.exports = router;