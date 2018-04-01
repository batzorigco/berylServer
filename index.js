var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var Article = require('./mongoose/article')
var User = require('./mongoose/user')
var Job = require('./mongoose/job')
var cors = require('cors')
var app = express()
app.use(cors())
// start the server

mongoose.connect('mongodb://localhost:27017/beryl');
var db = mongoose.connection;
db.on('error', () => {
  console.log( '---FAILED to connect to mongoose')
})
db.once('open', () => {
  console.log( '+++Connected to mongoose')
})

/*
 var articleItem = new Article({
     articleId: 3,
     title: "bazoo and bumaa",
     author: "john bumaa",
     body: "my third article",
 })

articleItem.save((err,result)=> {
  if (err) {console.log("---TodoItem save failed " + err)}
  console.log("+++TodoItem saved successfully "+articleItem.title)
 })
*/
/*
var userItem = new User({
  userId: 1,
  fisrtName: "Tsergiinkhuu",
  lastName: "Batzorig",
  birthDate: new Date(1998, 03, 31, 0, 0, 0, 0),
  nationality: "Mongolian",
  residence: "Mongolia",
  email: "bazoomn@gmail.com",
  visitedPlaces: "Japan, Korea, China",
  image: "none"
})


userItem.save((err,result)=> {
 if (err) {console.log("---TodoItem save failed " + err)}
 console.log("+++TodoItem saved successfully "+userItem.lastName)
})
*/
/*
var userItem = new Job({
  jobId: 1,
  empId: 1,
  name: "Visual Designer",
  desc: "Contract · Remote OK · Berlin · Frontend Developer",
  postDate: new Date(2018, 04, 01, 12, 00, 00, 00),
  state: "Hiring",
  cond: "Full-Time",
  skill: "ReactJS · React Native · HTML · CSS · Javascript",
  deadline: new Date(2018, 04, 12, 12, 00, 00, 00),
  phone: "95675679",
  rate: 50
})


userItem.save((err,result)=> {
 if (err) {console.log("---TodoItem save failed " + err)}
 console.log("+++TodoItem saved successfully "+ userItem.name)
})

app.listen(3000,()=> {console.log("+++Express Server is Running!!!")})
*/
app.get('/req',(req,res)=>{
  Article.find(function (err, article) {
    if (err) return handleError(err);
    console.log('length: '+ article.length);
    res.send(article);
  });
})

app.get('/job',(req,res)=>{
  Job.find(function (err, job) {
    if (err) return handleError(err);
    console.log('length: '+ job.length);
    res.send(job);
  });
})

app.get('/articles',(req,res)=>{
  Article.findOne({ 'articleId': req.query.id }, function (err, article) {
    if (err) return handleError(err);
    console.log('length: '+ article);
    console.log('req: ' + JSON.stringify(req));
    res.send(article);
  });
})

app.post('/', )

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})
