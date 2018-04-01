
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var empSchema = new Schema({
    empId: Number,
    userId: Number,
    name: String,
    logo: String,
    desc: String,
    website: String,
    email: String,
    phone: Number,
    category: String,
}, {collection:"Employers"});
// we need to create a model using it
var Employer = mongoose.model('Employer', empSchema);

module.exports = Employer;
