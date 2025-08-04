import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    // Check if MongoDB URI is provided
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  No MongoDB URI provided. Running in development mode without database.');
      console.log('💡 To connect to a database, set MONGODB_URI in your .env file');
      console.log('   Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname');
      return;
    }

    // Skip connection if using local MongoDB in WebContainer
    if (process.env.MONGODB_URI.includes('localhost') || process.env.MONGODB_URI.includes('127.0.0.1')) {
      console.log('⚠️  Local MongoDB not available in WebContainer environment.');
      console.log('💡 Please use MongoDB Atlas or another cloud database service.');
      console.log('   Update MONGODB_URI in your .env file with a cloud database connection string.');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🗄️  MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    console.log('💡 Consider using MongoDB Atlas for cloud database hosting.');
    // Don't exit the process in development, just log the error
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};