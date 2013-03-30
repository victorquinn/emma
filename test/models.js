/*
 * Test the models
 */

process.env.NODE_ENV = 'test';

var should = require('should'),
    config = require('../config'),
    app = require('../app'),
    supertest = require('supertest'),
    models = require('../models');

describe("User Model", function() {
    var User = models.User;

    describe("create", function() {
        it('it can be created', function(done) {
             user = new User();
             user.provider = "twitter";
             user.uid = 12345;
             user.displayname = "Ab Cd";
             user.username = "abcd";
             user.image = "http://link.to.image.com/img/123";
             user.save(function(err) {
                         if(err) { throw err; }
                         done(null, user);
                       });
           });               
    });

});
