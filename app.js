var express = require('express') ,
  http = require('http') ,
  path = require('path') ,
  RedisStore = require('connect-redis')(express),
  SECRET = require('secret-strings').NU_MINOR;
  _ = require('underscore');
  isProduction = process.env.NODE_ENV === 'production',
  youtube = require('youtube-feeds');

/**
 * @type {Object}
 */
global.goog = require('closure').Closure({
  CLOSURE_BASE_PATH: path.join(__dirname, 'libs/closure-library/closure/goog/')
});



var routes = require('./src/routes');
_.extend(routes, {
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
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
  require('node-sass').middleware({
    src: __dirname + '/public/sass',
    dest: __dirname + '/public/stylesheets',
    debug: !isProduction
  });
});



// Routes
app.get('/', routes.index);
app.get('/update', require('./src/routes/update').update);
app.get('/items/:itemId/view', routes.eachitem.view);



http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
