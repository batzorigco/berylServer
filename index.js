var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var Article = require('./mongoose/article')
var User = require('./mongoose/user')
var Job = require('./mongoose/job')
var usr = require('./mongoose/usr')
var cors = require('cors')
var session = require('express-session')
var bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.json());
app.use(cors())
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
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
*/
app.listen(3000,()=> {console.log("+++Express Server is Running!!!")})

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
app.get('/jobDetail',(req, res)=>{
  Job.findOne({'jobId': 1} ), function (err, job) {
    if (err) return handleError(err);
    console.log('length: '+ job);
    res.send(job);

  }
})

app.get('/articles',(req,res)=>{
  Article.findOne({ 'articleId': 1 }, function (err, article) {
    if (err) return handleError(err);
    console.log('length: '+ article);
    res.send(article);
  });
})

app.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    usr.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    usr.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

app.get('/profile', function (req, res, next) {
  usr.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});
app.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})
