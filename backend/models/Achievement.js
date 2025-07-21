const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String], // array of image filenames
});

module.exports = mongoose.model('Achievement', achievementSchema);
