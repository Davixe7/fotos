var Foto = require('../models/foto'),
	owner_check = require('./owner_check');

module.exports = function(req, res, next){
	Foto.findById(req.params.id).populate('author').exec(function(err, img){
		if(!err && owner_check(img, req, res)){
			res.locals.foto = img;
			next();
		}else{
			console.log("Error fgsdg:" + String(err));
			res.redirect('/app');
		}
	});
}