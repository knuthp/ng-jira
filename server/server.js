var express = require('express');
var app = express();

var request = require('request');

app.get('/rest/*', function(req, res) {
  //modify the url in any way you want
  var newurl = 'http://jira.atlassian.com/' + req.url;
  console.log('Using newUrl: ' + newurl);
  request(newurl).pipe(res);
});
module.exports = app;