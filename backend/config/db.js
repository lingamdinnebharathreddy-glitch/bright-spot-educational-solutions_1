import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isMongoDb = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  
  if (!mongoURI) {
    console.warn('\n===============================================================');
    console.warn('⚠️  MONGODB_URI environment variable not found!');
    console.warn('📁  Falling back to File-based JSON Database for local storage.');
    console.warn('📂  Data will be saved in backend/data/ directory.');
    console.warn('===============================================================\n');
    global.IS_MONGODB = false;
    isMongoDb = false;
    return false;
  }

  try {
    // Attempt Mongoose connection with a short 3-second timeout
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('\n===============================================================');
    console.log('🔌  MongoDB database connected successfully via Mongoose!');
    console.log('===============================================================\n');
    global.IS_MONGODB = true;
    isMongoDb = true;
    return true;
  } catch (err) {
    console.warn('\n===============================================================');
    console.warn('❌  Failed to connect to MongoDB server:', err.message);
    console.warn('📁  Falling back to File-based JSON Database for local storage.');
    console.warn('===============================================================\n');
    global.IS_MONGODB = false;
    isMongoDb = false;
    return false;
  }
};

export const getDbStatus = () => {
  return global.IS_MONGODB || isMongoDb;
};

export default connectDB;
