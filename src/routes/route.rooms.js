var express = require('express');
var router = express.Router();

var roomdbAcess = require('../db/knex.room');


// *** GET all shows *** //
router.get('/rooms', function(req, res, next) {
  roomdbAcess.getAll()
  .then(function(shows) {
    res.status(200).json(shows);
  })
  .catch(function(error) {
    next(error);
  });
});

// *** GET single show *** //
router.get('/rooms/:id', function(req, res, next) {
  roomdbAcess.getSingle(req.params.id)
  .then(function(show) {
    res.status(200).json(show);
  })
  .catch(function(error) {
    next(error);
  });
});

// *** add show *** //
router.post('/rooms', function(req, res, next) {
  roomdbAcess.add(req.body)
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
router.put('/rooms/:id', function(req, res, next) {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field'
    });
  }
  roomdbAcess.update(req.params.id, req.body)
  .then(function() {
    return roomdbAcess.getSingle(req.params.id);
  })
  .then(function(show) {
    res.status(200).json(show);
  })
  .catch(function(error) {
    next(error);
  });
});

// *** delete show *** //
router.delete('/rooms/:id', function(req, res, next) {
  roomdbAcess.getSingle(req.params.id)
  .then(function(show) {
    roomdbAcess.deleteItem(req.params.id)
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
