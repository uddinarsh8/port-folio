const mongoose = require('mongoose');

const patentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  applicationNumber: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Granted', 'Rejected'],
    default: 'Pending'
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  documentLink: {
    type: String
  }
});

module.exports = mongoose.model('Patent', patentSchema);
