// Yw43mNMSMElkZBrP;
import mongoose from 'mongoose';
import 'dotenv/config';
import { getEnvVar } from './src/utils/getEnvVar.js';

export const databaseConnection = async () => {
  try {
    const dbUser = getEnvVar('MONGODB_USER');
    const dbPass = getEnvVar('MONGODB_PASS');
    const dbUrl = getEnvVar('MONGODB_URL');
    const dbName = getEnvVar('MONGODB_DB_NAME');

    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@${dbUrl}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`,
      console.log('Mongo connection successfully established!'),
    );
  } catch (error) {
    console.log(`Error connection database ${error.message} `);
  }
};
