import db from "../src/db.js";
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../src/config.js";

export const login = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;
    const user = await db.oneOrNone("SELECT * FROM usuario WHERE correo = $1", [
      correo,
    ]);

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    if (contrasenia !== user.contrasenia) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = await createAccesToken({ id: user.idusuario, rol: user.rol });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
    });
    res.json({
      idusuario: user.idusuario,
      correo: user.correo,
      rol: user.rol,
      token: token 
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Cierre de sesion exitoso" }); 
};

export const verify = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado, falta token" });
  }
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);

    const userFound = await db.oneOrNone("SELECT idusuario, correo, rol FROM usuario WHERE idusuario = $1", [
      decoded.id,
    ]);

    if (!userFound) {
      res.clearCookie("token");
      return res.status(401).json({ message: "No autorizado, usuario no encontrado" });
    }

    return res.json({
      idusuario: userFound.idusuario,
      correo: userFound.correo,
      rol: userFound.rol,
    });
  } catch (error) {
     if (error.name === 'JsonWebTokenError') {
         return res.status(401).json({ message: "No autorizado, token inválido" });
     }
     if (error.name === 'TokenExpiredError') {
         return res.status(401).json({ message: "No autorizado, token expirado" });
     }
     console.error("Error en verify token:", error);
     return res.status(500).json({ message: "Error interno del servidor al verificar token" });
  }
};
