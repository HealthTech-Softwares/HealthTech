import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../src/config.js";

export const verifyToken = (req, res, next) => {
  let token = req.cookies.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token no válido" });
    }

    req.userId = user.id;
    req.userRole = user.rol;
    next();
  });
};


export const isAdmin = (req, res, next) => {
  if (req.userRole !== "Administrador") {
    return res.status(403).json({ message: "Se requiere rol administrador" });
  }
  next();
};

export const isPaciente = (req, res, next) => {
  if (req.userRole !== "Paciente") {
    return res.status(403).json({ message: "Se requiere rol paciente" });
  }
  next();
};

export const isPsicologo = (req, res, next) => {
  if (req.userRole !== "Psicologo") {
    return res.status(403).json({ message: "Se requiere rol psicologo" });
  }
  next();
};

export const hasRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.userRole)) {
      return res.status(403).json({ message: "No autorizado" });
    }
    next();
  };
}
