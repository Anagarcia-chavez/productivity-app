const mongoose = require('mongoose');

const clubTaskSchema = new mongoose.Schema({
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  title: { type: String, required: true },
  dueDate: Date,
  completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ClubTask', clubTaskSchema);