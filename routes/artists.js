'use strict';
var express = require('express');
var router = express.Router();
var knex = require('../knex');

const {
  decamelizeKeys
} = require('humps');

router.get('/artists', (_req, res, next) => {
  knex('artists')
    .orderBy('id')
    .then((artists) => {
      res.send(artists);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/artists/:id', (req, res, next) => {
  knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {
      if (!artist) {
        return next();
      }
      res.send(artist);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/artists', (req, res, next) => {
  knex('artists').insert(decamelizeKeys(req.body))
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
