var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var foto_schema = mongoose.Schema({
	title: {
		type: String,
		minlength: [6, "El titulo de la foto debe contener como minimo 6 caracteres"],
		maxlength: [16, "El titulo de la foto debe contener como maximo 16 caracteres"],
		required: "El titulo de la foto es obligatorio"
	},
	author:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	extension:{
		type: String,
		required: "La extensión de archivo es obligatoria"
	}
});

var Foto = mongoose.model('Foto', foto_schema);

module.exports = Foto;