const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: String,
  description: String,
  link: String
});

module.exports = mongoose.model('Project', ProjectSchema);