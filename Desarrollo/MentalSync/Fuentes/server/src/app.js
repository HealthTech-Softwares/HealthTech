import express from "express";
import cors from "cors";
import morgan from "morgan";
import pruebaRouter from "../routes/prueba.routes.js";
import psicologoRouter from "../routes/psicologos.routes.js";
import turnoRouter from "../routes/turnos.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(pruebaRouter);

// Routes
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

app.use("/api", psicologoRouter);
app.use("/api", turnoRouter);

// Handling errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
