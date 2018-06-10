var express = require("express");
// var vhost = require('vhost');
var MongoClient = require("mongodb").MongoClient;

var bodyParser = require('body-parser');
var cons = require('consolidate');
var path = require('path');

var app = express();
var url = process.env.URL || "mongodb://localhost:27017";
var dbName = process.env.DBNAME || "blog-nosql";
var port = process.env.PORT || 8000;
// var appURL = 'blog-nosql.com';

app.engine('html', cons.pug);
app.set('view engine', 'html');
app.set('views',  __dirname +  '/views');
app.use(bodyParser());

var routes = require("./routes");

app.use(express.static("public"));

// app.use(vhost(appURL, function handle (req, res) {
  //   // handle req + res belonging to mail.example.com
  //   // console.dir(req.vhost.host) // => 'foo.bar.example.com:8080'
  //   // console.dir(req.vhost.hostname) // => 'foo.bar.example.com'
  //   res.app("http://"+appURL +":"+port);
  // }))
  
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
    if(err) throw err;
    
    routes(app);
    
    app.client = client;
    app.db = client.db(dbName);
    
    app.listen(port, function() {
      console.log("now listening on http://localhost:" + port)
    });
  });
  
  module.exports = app;
  
