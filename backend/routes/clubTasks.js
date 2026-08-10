const express = require('express');
const router = express.Router();
const ClubTask = require('../models/ClubTask');

router.get('/', async (req, res) => {
  const filter = req.query.clubId ? { clubId: req.query.clubId } : {};
  const tasks = await ClubTask.find(filter).sort({ dueDate: 1 });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = new ClubTask(req.body);
  await task.save();
  res.status(201).json(task);
});

router.patch('/:id', async (req, res) => {
  const task = await ClubTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await ClubTask.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;