import { startServer } from './server.js';
import { databaseConnection } from '../databaseConnection.js';
import { TEMP_UPLOAD_DIR, PUBLIC_DIR } from './constants/index.js';
import { createDirIfNotExist } from './utils/reateDirIfNotExists.js';

const bootstrap = async () => {
  await databaseConnection();
  await createDirIfNotExist(TEMP_UPLOAD_DIR);
  await createDirIfNotExist(PUBLIC_DIR);
  startServer();
};

bootstrap();
