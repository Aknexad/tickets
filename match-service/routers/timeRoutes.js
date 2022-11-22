const express = require('express');

const teamModels = require('../models/models').Team;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const getTeams = await teamModels.find();
    if (!getTeams) return res.send('no team find');
    res.send(getTeams);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const teamName = req.body.name;
    const addTeam = await teamModels.create({
      name: teamName,
    });
    await addTeam.save();
    if (!addTeam) return res.send('try agen');
    res.json({ message: 'done', team: addTeam });
  } catch (error) {
    res.send(error);
  }
});
router.delete('/', async (req, res) => {
  try {
    const teamName = req.body.name;
    const deleteTeam = await teamModels.deleteOne({ name: teamName });
    if (!deleteTeam) return res.send('sumthing go roung');
    res.json({ message: 'done', team: deleteTeam });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
