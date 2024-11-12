import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../src/config.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: "No se otorgo token" });
    }

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Sin autorizacion" });
        }
        req.userId = decoded.id;
        req.userRole = decoded.rol;
        next();
    });
};

export const isAdmin = (req, res, next) => {
    if (req.userRole !== 'Administrador') {
        return res.status(403).json({ message: "Se requiere rol administrador" });
    }
    next();
};

export const isPaciente = (req, res, next) => {
    if (req.userRole !== 'Paciente') {
        return res.status(403).json({ message: "Se requiere rol paciente" });
    }
    next();
}

export const isPsicologo = (req, res, next) => {
    if (req.userRole !== 'Medico') {
        return res.status(403).json({ message: "Se requiere rol psicologo" });
    }
    next();
}