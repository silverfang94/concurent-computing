const express = require('express');

const router = express.Router();

const models = require('../models');

// a test
router.get('/vehicles', (req, res) => {
  models.vehicle
    .find({})
    .then(vehicles => {
      if (!vehicles) {
        res.json({
          error: 'Collection is empty!'
        });
      } else {
        res.json({
          vehicles: vehicles
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: 'Error, try later!'
      });
    });
});

module.exports = router;
