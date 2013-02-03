
/**
 * Module dependencies.
 */

var twitter_consumer_key = process.env.TWITTER_CONSUMER_KEY,
    twitter_consumer_secret = process.env.TWITTER_CONSUMER_SECRET,
    session_secret = process.env.SESSION_SECRET;

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , everyauth = require('everyauth');

everyauth.twitter
  .consumerKey(twitter_consumer_key)
  .consumerSecret(twitter_consumer_secret)
  .findOrCreateUser( function(session, accessTaken, accessTokenSecret, twitterUserMetadata) {
    console.log(twitterUserMetadata);
  })
  .redirectPath('/');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: session_secret}));
  app.use(app.router);
  app.use(everyauth.middleware());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
