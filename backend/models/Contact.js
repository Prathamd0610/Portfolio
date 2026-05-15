const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters.']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address.'
    ],
    lowercase: true
  },
  message: {
    type: String,
    required: [true, 'Message content cannot be empty.'],
    maxlength: [2000, 'Message cannot exceed 2000 characters.']
  },
  // Technical metadata for lead tracking
  ipAddress: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexing email for faster lookup if you ever build an admin dashboard
ContactSchema.index({ email: 1 });

module.exports = mongoose.model('Contact', ContactSchema);