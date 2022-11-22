const express = require('express');

const { Location } = require('../models/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res) => {
  // try {
  //   const locationInfo = {
  //     city:req.body.city,
  //     stadium:{
  //     }
  //   }
  //   const addLocation =
  // } catch (error) {
  // }
});
router.delete('/', (req, res) => {
  const location = req.body.location;
  db.location.findIndex(time => time === location);
  res.send('location remove');
});

module.exports = router;
