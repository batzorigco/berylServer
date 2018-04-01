
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var socialSchema = new Schema({
    socialId: Number,
    userId: Number,
    type: String,
    value: String
}, {collection:"Socials"});
// we need to create a model using it
var Social = mongoose.model('Social', socialSchema);

module.exports = Social;
