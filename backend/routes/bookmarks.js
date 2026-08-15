const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

router.get('/', async (req, res) => {
  const bookmarks = await Bookmark.find().sort({ createdAt: 1 });
  res.json(bookmarks);
});

router.post('/', async (req, res) => {
  const bookmark = new Bookmark(req.body);
  await bookmark.save();
  res.status(201).json(bookmark);
});

router.delete('/:id', async (req, res) => {
  await Bookmark.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;