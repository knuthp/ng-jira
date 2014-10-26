var express = require('express');
var app = express();
app.get('/api', function(req, res) {
  res.send('hello!');
});
module.exports = app;