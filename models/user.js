var mongoose = require('mongoose');

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost/fotos');

var user_schema = mongoose.Schema({
	username: {
		type: String,
		minlength: [6, "Nombre de usuario debe contener como minimo 6 caracteres"],
		maxlength: [16, "Nombre de usuario debe contener como maximo 16 caracteres"],
		required: "El nombre de usuario es obligatorio"
	},
	email: {
		type: String,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Ingresa una dirección de correo electrónico valida"],
		required: "El correo electrónico es obligatorio"
	},
	password: {
		type: String,
		minlength: [6, "La contraseña debe contener como minimo 6 caracteres"],
		maxlength: [16, "La contraseña debe contener como maximo 16 caracteres"],
		required: "La contraseña es obligatoria",
		validate:{
			validator: function(pw){
				return pw === this.passwordConfirm;
			},
			message: "Las contraseñas no coinciden"
		}
	}
});

user_schema.virtual('password_2').get(function(){
	return this.passwordConfirm;
}).set(function(pw){
	this.passwordConfirm = pw;
});

var User = mongoose.model('User', user_schema);

module.exports = User;