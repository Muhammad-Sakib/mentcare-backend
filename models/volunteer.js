const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    meetLink: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    starttime: {
      type: Date,
      default: Date.now, // Set the creation time when the document is created
    },
  });

module.exports = mongoose.model("Volunteer",volunteerSchema);