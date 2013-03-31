
/*
 * GET users listing.
 */

var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    models = require('../models'),
    User = models.User;

module.exports = function(app) {
  app.get('/account', function(req, res) {
    res.render('account', { title: "Emma", user: req.user });
  });
};
