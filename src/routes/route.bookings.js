"use strict";

var express = require('express');
var router = express.Router();
var bookingdbAcess = require('../db/knex.booking');

// *** GET all shows *** //
router.get('/bookings', function(req, res, next) {
  bookingdbAcess.getAll()
  .then(function(shows) {
    res.status(200).json(shows);
  })
  .catch(function(error) {
    next(error);
  });
});

// *** GET single show *** //
router.get('/bookings/:id', function(req, res, next) {
  bookingdbAcess.getSingle(req.params.id)
  .then(function(show) {
    res.status(200).json(show);
  })
  .catch(function(error) {
    next(error);
  });
});

// *** add show *** //
router.post('/bookings', function(req, res, next) {
  bookingdbAcess.add(req.body)
  .then(function(showID) {
    return queries.getSingle(showID);
  })
  .then(function(show) {
    res.json(show);
  })
  .catch(function(error) {
    next(error);
  });
});

// *** update show *** //
router.put('/bookings/:id', function(req, res, next) {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field'
    });
  }
  bookingdbAcess.update(req.params.id, req.body)
  .then(function() {
    return bookingdbAcess.getSingle(req.params.id);
  })
  .then(function(show) {
    res.status(200).json(show);
  })
  .catch(function(error) {
    next(error);
  });
});

// *** delete show *** //
router.delete('/bookings/:id', function(req, res, next) {
  bookingdbAcess.getSingle(req.params.id)
  .then(function(show) {
    bookingdbAcess.deleteItem(req.params.id)
    .then(function() {
      res.status(200).json(show);
    })
    .catch(function(error) {
      next(error);
    });
  }).catch(function(error) {
    next(error);
  });
});


module.exports = router;
