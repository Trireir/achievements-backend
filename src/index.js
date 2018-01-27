
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import Promise from 'bluebird';

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
    res.status(400).json({
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
    res.status(400).json({
      message: 'Friends list not available. Maybe the id doesn\'t exist or the profile is private'
    })
  })
})

app.get('/api/getGameInfo', (req, res) => {
  if(!req.query.gameid) {
    return res.status(200).json({});
  }

  Axios.get(pathnames.getGameInfo(req.query.gameid))
  .then((result) => {
    res.status(200).json(result.data.game)
  })
  .catch((err) => {
    res.status(404).json({
      message: 'Game doesn\'t exist'
    })
  })
});

app.get('/api/getGameAchievements', (req, res) => {
  if(!req.query.gameid || !req.query.userid || !req.query.friendid) {
    return res.status(200).json({});
  }

  Promise.all([
    Axios.get(pathnames.getGameAchievements(req.query.gameid)),
    Axios.get(pathnames.getUserAchievements(req.query.gameid, req.query.userid)),
    Axios.get(pathnames.getUserAchievements(req.query.gameid, req.query.friendid))    
  ])
  .spread((games, user, friend) => {
    const gamesAchievements = games.data.game.availableGameStats.achievements;
    const userAchievements = user.data.playerstats.achievements;
    const friendAchievements = friend.data.playerstats.achievements;

    const achievements = {}
    gamesAchievements.forEach((ga) => {
      achievements[ga.name] = {
        displayName: ga.displayName,
        description: ga.description,
        icon: ga.icon,
        icongray: ga.icongray,
        hidden: ga.hidden
      }
    });
    userAchievements.forEach((ua) => {
      achievements[ua.apiname].userAchieved = ua.achieved;
    });
    friendAchievements.forEach((fa) => {
      achievements[fa.apiname].friendAchieved = fa.achieved;
    });
    res.status(200).json(achievements)
  })
  .catch((err) => {
    res.status(400).json({
      message: 'There is no achievements available for this game',
      err: err,
    })
  });
});

app.listen(process.env.PORT || 3333, function () {
  console.log(`Listening on ${process.env.PORT || 3333} port`);
});