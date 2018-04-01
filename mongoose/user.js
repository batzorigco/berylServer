
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: Number,
    fisrtName: String,
    lastName: String,
    birthDate: Date,
    natl: String,
    resid: String,
    email: String,
    visitedPlaces: String,
    image: String
}, {collection:"Users"});
// we need to create a model using it
var User = mongoose.model('User', userSchema);

module.exports = User;
