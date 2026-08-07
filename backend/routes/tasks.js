const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//LISTS ALL TASKS
router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ dueDate: 1 });
  res.json(tasks);
});

//CREATE NEW TASK
router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

//UPDATE A TASK (MARK AS DONE, ETC.)
router.patch('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

//REMOVE TASK
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;