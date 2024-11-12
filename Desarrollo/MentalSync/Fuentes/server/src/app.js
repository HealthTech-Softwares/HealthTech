import express from "express";
import cors from "cors";
import morgan from "morgan";
import psicologoRouter from "../routes/psicologos.routes.js";
import turnoRouter from "../routes/turnos.routes.js";
import especialidadRouter from "../routes/especialidad.routes.js";
import authRouter from "../routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

app.use("/api", authRouter);
app.use("/api", psicologoRouter);
app.use("/api", turnoRouter);
app.use("/api", especialidadRouter);

// Handling errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
