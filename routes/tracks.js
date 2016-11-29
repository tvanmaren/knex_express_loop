'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../knex');

router.get('/tracks', (_req, res, next) => {
  knex('tracks')
    .orderBy('id')
    .then((tracks) => {
      res.send(tracks);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/tracks/:id', (req, res, next) => {
  knex('tracks')
  .where('id', req.params.id)
  .first()
  .then((tracks)=>{
    if (!tracks) {
      return next();
    }
    res.send(tracks);
  })
  .catch((err)=>{
    next(err);
  });
});

module.exports = router;
