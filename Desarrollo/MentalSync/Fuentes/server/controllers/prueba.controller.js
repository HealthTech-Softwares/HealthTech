import db from "../src/db.js";

export const getPing = async (req, res) => {
  try {
    const result = await db.any("SELECT 1+1 as result");
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};
