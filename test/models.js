/*
 * Test the models
 */

process.env.NODE_ENV = 'test';

var chai = require('chai'),
    assert = chai.assert,
    config = require('../config'),
    app = require('../app'),
    supertest = require('supertest'),
    models = require('../models');

describe("User Model", function() {
    var User = models.User,
        testuser = {};

    describe("create", function() {
        it("it can be created", function(done) {
             testuser = new User();
             testuser.provider = "twitter";
             testuser.uid = '12345';
             testuser.displayname = "Ab Cd";
             testuser.username = "abcd";
             testuser.image = "http://link.to.image.com/img/123";
             testuser.save(function(err) {
                         assert.isNull(err);
                         done(null, testuser);
                       });
        });

        it("can be loaded from database", function(done) {
             testuser = {};
             User.findOne({uid: '12345'}, function(err, user) {
                 assert.isNull(err);
                 testuser = user;
                 assert.isNotNull(testuser, 'testuser exists');
                 done();
             });
        });
    });

    describe("read", function() {
        it("its properties can be accessed", function(done) {
             assert.equal(testuser.uid, '12345');
             assert.equal(testuser.username, 'abcd');
             done();
        });

        it("doesn't have properties not set", function(done) {
             assert.isUndefined(testuser.blahblah);
             done();
        });
    });

    describe("delete", function() {
        it("can be deleted", function(done) {
             testuser.remove({uid: '12345'});
             done();
        });
        it("can be deleted", function(done) {
             User.find({uid: '12345'}, function(err, user) {
                 assert.deepEqual([], user);
                 done();
             });
        });
    });

});
