/*
 * Set up some environment defaults for these tests
 */
process.env.TWITTER_CONSUMER_KEY = 1234;
process.env.TWITTER_CONSUMER_SECRET = 'abcd';
process.env.SESSION_SECRET = 'a1b2c3d4';
process.env.NODE_ENV = 'test';

var should = require('should'),
    app = require('../app'),
    supertest = require('supertest');

describe("Emma", function() {
  describe("is alive", function() {
    it('useless empty test', function(done) {
      done();
    });
  })
});

describe("Emma's", function() {
  describe("'/' route", function() {
    it('should respond to /', function(done) {
      supertest(app)
        .get('/')
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          done();
        });
    });
  });
});

