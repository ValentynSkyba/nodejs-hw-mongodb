import { startServer } from './server.js';
import { databaseConnection } from '../databaseConnection.js';

const bootstrap = async () => {
  await databaseConnection();
  startServer();
};

bootstrap();
