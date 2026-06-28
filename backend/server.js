const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

// Initialize Configuration
dotenv.config();

// Connect to Persistent Storage
connectDB();

const app = express();

// Security & Data Parsing Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Protection against large payloads
app.use(express.urlencoded({ extended: true }));

// --- API Architecture ---
app.use('/api/v1/contact', contactRoutes);

// Professional Health Check Endpoint (registered before the catch-all so it isn't shadowed)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'System Operational',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const path = require('path');

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// For any route that is not an API route, send back the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Global Error Handler for Async Errors
app.use((err, req, res, next) => {
  console.error(`[SYSTEM_ERROR]: ${err.stack}`);
  res.status(500).json({
    success: false,
    message: 'An internal synchronization error occurred.'
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
  -----------------------------------------
  🚀 SERVER DEPLOYED IN ${(process.env.NODE_ENV || 'development').toUpperCase()} MODE
  📡 LISTENING ON PORT: ${PORT}
  -----------------------------------------
  `);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});