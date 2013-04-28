
/**
 * Module dependencies.
 */

var newrelic = require('newrelic'),
    express = require('express'),
    mongoose = require('mongoose'),
    config = require('./config'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    models = require('./models'),
    User = models.User;

/**
 * Data setup
 */
mongoose.connect(config.mongoUri);

var app = module.exports = express();

function checkAuth(req,res,next){
    if(req.user) next();//Forward the request so it can be handled by your router
    else res.send(403);//send access denied
}

passport.serializeUser(function(user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function(id, done) {
  User.findOne({uid: id}, function(err, user) {
    done(err, user);
  });
});

app.configure(function(){
  app.set('port', config.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: config.session_secret}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express['static'](path.join(__dirname, 'public')));
});

app.all('/account/*', checkAuth);

var key;
for (key in routes) {
  if (routes.hasOwnProperty(key)) {
    routes[key](app);
  }
}

app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
