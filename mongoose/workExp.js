
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var workExpSchema = new Schema({
    workExpId: Number,
    uesrId: Number,
    type: String,
    startDate: Date,
    endDate: Date,
}, {collection:"WorkExperiences"});
// we need to create a model using it
var WorkExp = mongoose.model('WorkExperience', workExpSchema);

module.exports = WorkExp;
