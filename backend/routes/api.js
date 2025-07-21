const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Contact = require('../models/Contact');
const Patent = require('../models/Patent');

router.get('/achievements', async (req, res) => res.json(await Achievement.find()));
router.get('/projects', async (req, res) => res.json(await Project.find()));
router.get('/skills', async (req, res) => res.json(await Skill.find()));
router.get('/patents', async (req, res) => res.json(await Patent.find()));
router.post('/contact', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ message: 'Message received!' });
});

module.exports = router;
