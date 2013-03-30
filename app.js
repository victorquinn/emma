
/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    Schema = mongoose.Schema;

/**
 * Environment variables
 */

var twitter_consumer_key = process.env.TWITTER_CONSUMER_KEY,
    twitter_consumer_secret = process.env.TWITTER_CONSUMER_SECRET,
    session_secret = process.env.SESSION_SECRET;

/**
 * Data setup
 */
mongoose.connect(process.env.MONGOLAB_URI);
var UserSchema = new Schema({
  provider: String,
  uid: String,
  name: String,
  image: String,
  created: {type: Date, 'default': Date.now}
});
var User = mongoose.model('User', UserSchema);


passport.use(new TwitterStrategy({
    consumerKey: twitter_consumer_key,
    consumerSecret: twitter_consumer_secret,
    callbackURL: "http://localhost:5000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({uid: profile.id}, function(err, user) {
        if (user) {
            done(null, user);
        }
        else {
            user = new User();
            user.provider = "twitter";
            user.uid = profile.id;
            user.name = profile.displayName;
            user.image = profile._json.profile_image_url;
            user.save(function(err) {
                if(err) { throw err; }
                done(null, user);
            });
        }
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.uid);
});

var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: session_secret}));
  app.use(app.router);
  app.use(express['static'](path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
