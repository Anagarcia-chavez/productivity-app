const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

router.get('/', async (req, res) => {
  const playlists = await Playlist.find().sort({ createdAt: 1 });
  res.json(playlists);
});

router.post('/', async (req, res) => {
  const playlist = new Playlist(req.body);
  await playlist.save();
  res.status(201).json(playlist);
});

router.delete('/:id', async (req, res) => {
  await Playlist.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;