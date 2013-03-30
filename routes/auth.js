
/*
 * GET auth routes.
 */

var twitter_consumer_key = process.env.TWITTER_CONSUMER_KEY,
    twitter_consumer_secret = process.env.TWITTER_CONSUMER_SECRET;

var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    models = require('../models'),
    User = models.User;

module.exports = function(app) {
    passport.use(new TwitterStrategy(
        {
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
                    user.displayname = profile.displayName;
                    user.username = profile.username;
                    user.image = profile._json.profile_image_url;
                    user.save(function(err) {
                        if(err) { throw err; }
                        done(null, user);
                    });
                }
            });
        }
    ));

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/login' }));
};
