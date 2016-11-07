module.exports = function(server, session_middleware){
	var io = require('socket.io')(server),
		redis = require('redis'),
		client = redis.createClient();
	
	client.subscribe('fotos');
	
	io.use(function(socket, next){
		session_middleware(socket.request, socket.request.res, next);
	});
	
	client.on('message', function(chan, msg){
		if(chan == "fotos"){
			io.emit('news', msg);
		}
	});
	
	io.on("connection", function(socket){
		console.log("Sockets funcionando ");
	});
}