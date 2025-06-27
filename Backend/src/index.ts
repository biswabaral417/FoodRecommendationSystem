import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/pool';
import app from './app';
import startServer from './server';

const PORT = process.env.Server_PORT || 5000;

(async () => {
  try {
    const connection = await connectDB();
    app.locals.db = connection;
    startServer(app, PORT);
  } catch (error) {
    console.error(' Failed to start the server:', error);
    process.exit(1);
  }
})();


