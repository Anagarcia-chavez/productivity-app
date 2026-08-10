const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  links: [{
    label: String,
    url: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);