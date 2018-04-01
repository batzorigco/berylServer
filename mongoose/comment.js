
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commSchema = new Schema({
    commentId: Number,
    userId: Number,
    articleId: Number,
    body: String,
}, {collection:"Comments"});
// we need to create a model using it
var Comm = mongoose.model('Comment', commSchema);

module.exports = Comm;
