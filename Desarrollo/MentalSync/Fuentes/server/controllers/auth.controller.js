import db from "../src/db.js";
import { createAccesToken } from "../libs/jwt.js";

export const login = async (req, res) => {
    try{
        const { correo , contrasenia } = req.body;

        const user = await db.query("SELECT * FROM usuario WHERE correo = $1", [correo]);

        if (!user || user.length === 0) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const userFound = user[0];

        if (contrasenia !== userFound.contrasenia) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = createAccesToken({id: userFound.idusuario, rol: userFound.rol});

        res.cookie("token", token, { httpOnly: true });
        res.json(
            {
                idusuario: userFound.idusuario,
                correo: userFound.correo,
                rol: userFound.rol
            }
        )
    } catch (error) {
        console.error("Error en login", error);
        res.status(500).json({ message: "Error en login" });
    }
}
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Cierre de sesion exitoso" });
}