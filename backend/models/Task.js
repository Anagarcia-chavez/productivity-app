const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  class: { type: String, default: '' },
  dueDate: Date,
  completed: { type: Boolean, default: false },
  source: { type: String, default: 'manual' },
  type: { type: String, default: 'assignment' } // 'assignment' or 'quiz'
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);