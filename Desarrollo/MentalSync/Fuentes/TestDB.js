import { connectDB } from './server/src/db.js';

(async () => {
  try {
    await connectDB();
    console.log("Connection test successful");
  } catch (error) {
    console.error("Connection test failed", error);
  }
})();