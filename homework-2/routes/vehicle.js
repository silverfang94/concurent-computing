const express = require('express');

const router = express.Router();

const models = require('../models');

//get vehicle by id
router.get('/vehicle/:id', (req, res) => {
  const id = req.params.id;

  models.vehicle
    .findOne({ uid: id })
    .then(vehicle => {
      if (!vehicle) {
        res.json({
          ok: false,
          error: 'Vehicles with that uid not exist!'
        });
      } else {
        res.json({
          vehicle: vehicle
        });
      }
    })
    .catch(error => {
      console.log(err);
      res.json({
        ok: false,
        error: err
      });
    });
});

//post vehicle
router.post('/vehicle', (req, res) => {
  const vehicle = req.body;

  if (!vehicle) {
    res.json({
      ok: false,
      error: 'Body are empty.'
    });
  } else {
    models.vehicle
      .create(vehicle)
      .then(vehicle => {
        res.json({
          ok: true,
          message: 'Object are inserted',
          vehicle: vehicle
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

//update vehicle by id
router.put('/vehicle/:id', (req, res) => {
  const id = req.params.id;
  const updateVehicle = req.body;

  console.log(updateVehicle);

  models.vehicle
    .findOneAndUpdate({ uid: id }, { $set: updateVehicle }, { new: true })
    .then(vehicle => {
      if (!vehicle) {
        res.json({
          ok: false,
          error: 'Vehicles with that uid not exist!'
        });
      } else {
        res.json({
          update: updateVehicle,
          vehicle: vehicle
        });
      }
    })
    .catch(error => {
      console.log(err);
      res.json({
        ok: false,
        error: err
      });
    });
});

//delete vehicle by id
router.delete('/vehicle/:id', (req, res) => {
  const id = req.params.id;

  models.vehicle
    .deleteOne({ uid: id })
    .then(() => {
      res.json({
        ok: true,
        message: `Vehicle with uid:${id} are deleted.`
      });
    })
    .catch(error => {
      console.log(err);
      res.json({
        ok: false,
        error: err
      });
    });
});

module.exports = router;
