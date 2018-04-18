var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var usrSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});

//authenticate input against database
usrSchema.statics.authenticate = function (email, password, callback) {
  usr.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, usr.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
usrSchema.pre('save', function (next) {
  var user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(usr.password, salt, function (err, hash){
      if (err) {
        return next(err);
      }
      usr.password = hash;
      next();
    })
});

});
var usr = mongoose.model('Users', usrSchema);
module.exports = usr;
