import app from "./server/src/app.js";
import { PORT } from "./server/src/config.js";

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
