
/*
 * User model
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    provider: String,
    username: String,
    uid: String,
    displayname: String,
    firstname: String,
    lastname: String,
    image: String,
    created: {type: Date, 'default': Date.now}
  }
);
var User = mongoose.model('User', UserSchema);

module.exports = User;