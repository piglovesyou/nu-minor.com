











// login


/**
 * Module dependencies.
 */

var express = require('express') ,
  http = require('http') ,
  path = require('path') ,
  RedisStore = require('connect-redis')(express),
  SECRET = require('secret-strings').NU_MINOR;
  sass = require('node-sass'),
  _ = require('underscore');
  isProduction = process.env.NODE_ENV === 'production',
  youtube = require('youtube-feeds');

var routes = require('./src/routes');
_.extend(routes, {
  auth: require('./src/routes/auth'),
  eachitem: require('./src/routes/eachitem'),
  users: require('./src/routes/items')
});

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: SECRET.SESSION_SECRET,
    store: new RedisStore(),
    cookie: {maxAge: 60 * 60 * 1000}
  }));
  app.use(app.router);
  sass.middleware({
    src: __dirname + '/public/sass',
    dest: __dirname + '/public/stylesheets',
    debug: !isProduction
  });
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});



// Routes

app.get('/', routes.index);

app.get('/auth', routes.auth.index);
app.get('/auth/auth', routes.auth.auth);
app.get('/auth/callback', routes.auth.callback);
app.get('/auth/logout', routes.auth.logout);

app.get('/items/:itemId/view', routes.eachitem.itemExistsMW, routes.eachitem.view);
app.post('/items/:itemId/like', routes.auth.requireAuthMW, routes.eachitem.itemExistsMW, routes.eachitem.like);
app.post('/items/:itemId/bad', routes.auth.requireAuthMW, routes.eachitem.itemExistsMW, routes.eachitem.bad);

app.get('/users/:userId/view', routes.users.userExistsMW, routes.users.view);



http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
