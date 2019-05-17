var express = require('express');
const colors = require('./colors');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', function (req, res) {
  res.send("rgb("+colors.COLORS[req.query.current_index].join(",")+")");
});

app.listen(8000);