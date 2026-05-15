const Contact = require('../models/Contact');

/**
 * @desc    Submit Contact Form – Store to MongoDB only
 * @route   POST /api/v1/contact/submit
 * @access  Public
 */
exports.handleContactSubmission = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Persist lead to the database with metadata
    const lead = await Contact.create({
      name,
      email,
      message,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been securely stored.',
    });
  } catch (error) {
    console.error(`[DB_SAVE_ERROR]: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Failed to save your message. Please try again later.',
    });
  }
};