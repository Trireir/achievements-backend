var express = require('express');
var app = express();

app.get('/api/getUserId', function (req, res) {
  res.send('Hello World!');
});

app.listen(3333, function () {
  console.log('Listening on 3333 port');
});