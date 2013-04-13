











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
  isProduction = process.env.NODE_ENV === 'production',
  youtube = require('youtube-feeds');

var routes = {
  index: require('./src/routes'),
  auth: require('./src/routes/auth'),
  eachitem: require('./src/routes/eachitem')
};

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
    cookie: {maxAge: 3600 * 1000}
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

app.get('/', routes.index.view);
app.get('/auth', routes.auth.index);
app.get('/auth/auth', routes.auth.auth);
app.get('/auth/callback', routes.auth.callback);
app.get('/auth/logout', routes.auth.logout);
app.get('/:itemid/view', routes.eachitem.view);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
