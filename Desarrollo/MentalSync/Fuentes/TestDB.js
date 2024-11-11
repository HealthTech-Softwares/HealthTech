import { db } from './server/src/db.js';

(async () => {
  try {
    await db();
    console.log("Connection test successful");
  } catch (error) {
    console.error("Connection test failed", error);
  }
})();