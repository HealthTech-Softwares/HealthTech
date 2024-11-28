import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import psicologoRouter from "../routes/psicologos.routes.js";
import turnoRouter from "../routes/turnos.routes.js";
import especialidadRouter from "../routes/especialidad.routes.js";
import authRouter from "../routes/auth.routes.js";
import pacienteRouter from "../routes/paciente.routes.js";
import citaRouter from "../routes/citas.routes.js";
import notificacionRouter from "../routes/notificacion.routes.js";
import { FRONTEND_URL } from "./config.js";
 
const allowedOrigins = [
  FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

app.use("/api", authRouter);
app.use("/api", psicologoRouter);
app.use("/api", turnoRouter);
app.use("/api", especialidadRouter);
app.use("/api", pacienteRouter);
app.use("/api", citaRouter);
app.use("/api", notificacionRouter);

// Handling errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
