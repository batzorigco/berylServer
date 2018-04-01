
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var jobSchema = new Schema({
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
}, {collection:"Jobs"});
// we need to create a model using it
var Job = mongoose.model('Job', jobSchema);

module.exports = Job;
