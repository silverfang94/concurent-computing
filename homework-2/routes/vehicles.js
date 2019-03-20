const express = require('express');

const router = express.Router();

const models = require('../models');

// get vehicles
router.get('/vehicles', (req, res) => {
  const query = req.query;
  models.vehicle
    .find(query)
    .then(vehicles => {
      if (!vehicles) {
        res.json({
          ok: false,
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
        ok: false,
        error: err
      });
    });
});

//delete vehicles router
router.delete('/vehicles', (req, res) => {
  const query = req.query;
  models.vehicle
    .deleteMany(query)
    .then(() => {
      res.json({
        ok: true,
        message: 'Collection are deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        ok: false,
        error: err
      });
    });
});

//post vehicles list
router.post('/vehicles', (req, res) => {
  const vehicles = req.body;

  if (!vehicles) {
    res.json({
      ok: false,
      error: 'Body are empty.'
    });
  } else {
    models.vehicle
      .insertMany(vehicles)
      .then(vehicles => {
        res.json({
          ok: true,
          message: 'Collection are inserted',
          vehicles: vehicles
        });
      })
      .catch(error => {
        console.log(err);
        res.json({
          ok: false,
          error: err
        });
      });
  }
});

module.exports = router;
