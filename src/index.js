
import express from 'express';
import axios from 'axios';
import cors from 'cors';

import pathnames from './pathnames';

const Axios = axios.create({
  baseURL: 'http://api.steampowered.com/',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

const app = express()
app.use(cors({ origin: '*' }))

app.get('/api/getUserId', (req, res) => {
  if(!req.query.username) {
    return res.status(200).json({});
  }

  Axios.get(pathnames.getUserId(req.query.username))
  .then((result) => {
    if(result.data.response.success !== 1) {
      return res.status(404).json(result.data.response);
    }
    res.status(200).json(result.data.response);
  });
});

app.get('/api/getUserInfo', (req, res) => {
  if(!req.query.userid) {
    return res.status(200).json({});
  }
  const userIds = req.query.userid.split(',')
  Axios.get(pathnames.getUserInfo(userIds))
  .then((result) => {
    res.status(200).json(result.data.response);
  });
});

app.get('/api/getFriendsIds', (req, res) => {
  if(!req.query.userid) {
    return res.status(200).json({});
  }

  Axios.get(pathnames.getFriendsIds(req.query.userid))
  .then((result) => {
    res.status(200).json(result.data.friendslist);
  })
  .catch((err) => {
    res.status(404).json({
      message: 'Friends list not available. Maybe the id doesn\'t exist or the profile is private'
    })
  })
});

app.get('/api/getUserGames', (req, res) => {
  if(!req.query.userid) {
    return res.status(200).json({});
  }

  Axios.get(pathnames.getUserGames(req.query.userid))
  .then((result) => {
    res.status(200).json(result.data.response)
  })
  .catch((err) => {
    res.status(404).json({
      message: 'Friends list not available. Maybe the id doesn\'t exist or the profile is private'
    })
  })
})

app.get('/api/getGameInfo', (req, res) => {
  if(!req.query.gameId) {
    return res.status(200).json({});
  }

  Axios.get(pathnames.getGameInfo(req.query.gameId))
  .then((result) => {
    res.status(200).json(result.data.game)
  })
  .catch((err) => {
    res.status(404).json({
      message: 'Game doesn\'t exist'
    })
  })
});

app.listen(process.env.PORT || 3333, function () {
  console.log(`Listening on ${process.env.PORT || 3333} port`);
});