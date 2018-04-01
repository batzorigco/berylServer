
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var empSchema = new Schema({
    jobId: Number,
    empId: Number,
    name: String,
    desc: String,
    postDate: Date,
    state: String,
    cond: String,
    skill: String,
    deadline: Date,
    phone: Number,
    rate: Number
}, {collection:"Employers"});
// we need to create a model using it
var Employer = mongoose.model('Employer', empSchema);

module.exports = Employer;
