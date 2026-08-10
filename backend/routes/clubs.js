const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

router.get('/', async (req, res) => {
  const clubs = await Club.find().sort({ name: 1 });
  res.json(clubs);
});

router.post('/', async (req, res) => {
  const club = new Club({ name: req.body.name, links: [] });
  await club.save();
  res.status(201).json(club);
});

router.patch('/:id', async (req, res) => {
  const club = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(club);
});

router.delete('/:id', async (req, res) => {
  await Club.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;