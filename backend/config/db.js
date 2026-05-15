const mongoose = require('mongoose');

const connectDB = async () => {
  const options = {
    autoIndex: true, // Build indexes for faster queries
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to connect for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    
    // Aesthetic Console Logging for Dev
    console.log(`\x1b[34m%s\x1b[0m`, `[DATABASE]: High-performance connection established.`);
    console.log(`\x1b[32m%s\x1b[0m`, `[HOST]: ${conn.connection.host}`);
    
  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `[DATABASE_CRITICAL_FAILURE]: ${error.message}`);
    // Retry logic could be implemented here for production
    process.exit(1);
  }
};

module.exports = connectDB;