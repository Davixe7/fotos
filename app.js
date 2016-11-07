var express = require('express'), 
	pug = require('pug'),
	routes = require('./routes/routes'),
	routes_app = require('./routes/routes_app'),
	formidable = require('express-formidable'),
	sessionMiddleware = require('./middlewares/session'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	redisStorage = require('connect-redis')(session),
	realtime = require('./realtime'), 
	http = require('http');
	
var app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');
var server = http.Server(app);

var session_middleware = session({
	store: new redisStorage({}),
	secret: "superultrasecretword",
	resave: false,
	saveUninitialized: false
});

realtime(server, session_middleware);
app.use(session_middleware);


app.use(formidable({keepExtensions: true}));

app.use(methodOverride("_method"));
app.use('/', routes);
app.use('/app', sessionMiddleware);
app.use('/app', routes_app);

server.listen(8080);