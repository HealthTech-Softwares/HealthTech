import app from "./server/src/app.js";
import { PORT } from "./server/src/config.js";
import { connectMongoDB } from "./server/src/dbMongo.js";

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
