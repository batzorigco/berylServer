
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var locationSchema = new Schema({
    locationId: Number,
    empId: Number,
    continent: String,
    country: String,
    city: Date,
    address: String
}, {collection:"Locations"});
// we need to create a model using it
var Location = mongoose.model('Location', locationSchema);

module.exports = Location;
