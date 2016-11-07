var socket = io();

socket.on('news', function(data){
	data = JSON.parse(data);
	
	console.log(data);
	
	var container = document.querySelector('#img-container');
	var source = document.querySelector('#img-template').innerHTML;
	
	var template = Handlebars.compile(source);
	
	container.innerHTML += template(data);
	
});

