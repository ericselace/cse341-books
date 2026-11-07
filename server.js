
import app from './app.js';
import { connectToDb } from './src/db/connect.js';

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('PORT is not defined in the environment variables');
}

const startServer = async () => {
  try {
    await connectToDb();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

startServer();
