const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Skill', SkillSchema);
