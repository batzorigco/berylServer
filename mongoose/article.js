
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    articleId: Number,
    title: String,
    userId: Number,
    desc: String,
    body: String,
    tag: String
}, {collection:"Articles"});
// we need to create a model using it
var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
