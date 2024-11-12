import db from "../src/db.js";
import { createAccesToken } from "../libs/jwt.js";

export const login = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;
        const user = await db.oneOrNone("SELECT * FROM usuario WHERE correo = $1", [correo]);

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        if (contrasenia !== user.contrasenia) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = await createAccesToken({ id: user.idusuario, rol: user.rol });

        res.cookie("token", token, { httpOnly: true });

        res.json({
            idusuario: user.idusuario,
            correo: user.correo,
            rol: user.rol
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Cierre de sesion exitoso" });
}