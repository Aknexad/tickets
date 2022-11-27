const express = require('express');

const { Stadium } = require('../models/models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allStadium = await Stadium.find();
    res.send(allStadium);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const stadiumCeack = await Stadium.findOne({ name: req.body.name });
    if (stadiumCeack) return res.send('stadim already added');

    const addStadium = await Stadium.create({
      name: req.body.name,
      capacity: req.body.capacity,
      location: req.body.location,
    });
    res.json({ messge: 'done', stadium: addStadium });
  } catch (error) {
    res.json(error);
  }
});
router.delete('/', async (req, res) => {
  try {
    const id = req.body.id;
    const deleteStadium = await Stadium.deleteOne({ _id: id });
    console.log(deleteStadium);
    if (deleteStadium.deletedCount === 0) return res.sendStatus(400);
    res.sendStatus(200);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
