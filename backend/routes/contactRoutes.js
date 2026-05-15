const express = require('express');
const router = express.Router();
const { handleContactSubmission } = require('../controllers/contactController');

/**
 * @route   POST /api/v1/contact/submit
 * @desc    Main endpoint for portfolio contact form
 * @access  Public
 */
router.route('/submit').post(handleContactSubmission);

// Additional routes for an admin dashboard can be added here
// router.route('/all').get(protect, getAllLeads);

module.exports = router;