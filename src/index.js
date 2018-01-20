
require('babel-core/register');
import express from 'express';

const app = express()


app.get('/api/getUserId/:username', (req, res) => {
  res.status(200).json({hello: 'WORLD'});
});

app.listen(3333, function () {
  console.log('Listening on 3333 port');
});