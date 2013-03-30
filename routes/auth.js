
/*
 * GET auth routes.
 */

var passport = require('passport');

module.exports = function(app) {
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/login' }));
};
