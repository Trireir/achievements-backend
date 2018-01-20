
import express from 'express';
import axios from 'axios';

import pathnames from './pathnames';

const Axios = axios.create({
  baseURL: 'http://api.steampowered.com/ISteamUser'
});

const app = express()

app.get('/api/getUserId/:username', (req, res) => {
  if(!req.params.username) {
    return res.status(200).json({});
  }

  Axios.get(pathnames.getUserId(req.params.username))
  .then((result) => {
    if(result.data.response.success !== 1) {
      return res.status(404).json(result.data.response);
    }
    res.status(200).json(result.data.response);
  });
});

app.listen(3333, function () {
  console.log('Listening on 3333 port');
});