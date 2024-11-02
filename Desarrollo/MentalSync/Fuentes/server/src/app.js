import express from "express";
import cors from "cors";
import morgan from "morgan";
import pruebaRouter from "../routes/prueba.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(pruebaRouter);

app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

export default app;
