var express = require('express');
const colors = require('./colors');
var app = express();

app.get('/', function (req, res) {
  res.send("rgb("+colors.COLORS[req.query.current_index].join(",")+")");
});

app.listen(8000);