





/**
 * Module dependencies.
 */

var express = require('express') ,
  routes = require('./src/routes') ,
  http = require('http') ,
  path = require('path') ,
  sass = require('node-sass'),
  isProduction = process.env.NODE_ENV === 'production',
  youtube = require('youtube-feeds')

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // app.use(express.cookieParser('your secret here'));
  // app.use(express.session());
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

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
