import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";

const generarToken = (usuarioId, rol) => {
  return jwt.sign(
    { uid: usuarioId, rol },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // token válido por 1 hora
  );
};

// REGISTRO
export const registrarUsuario = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const { nombre, email, password, rol } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      rol: rol || "usuario",
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    });

  } catch (error) {
    console.error("Error en registrarUsuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// LOGIN
export const loginUsuario = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = generarToken(usuario._id, usuario.rol);

    // ⭐ OPCIONAL: cookie httpOnly (seguridad extra)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    // ⭐ RESPUESTA FINAL (token incluido - NECESARIO PARA FRONTEND)
    return res.json({
      message: "Inicio de sesión correcto",
      token, // <- 🔥 ESTO ES LO QUE NECESITAS
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });

  } catch (error) {
    console.error("Error en loginUsuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// LOGOUT
export const logoutUsuario = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada correctamente" });
};

// PERFIL (requiere token)
export const perfilUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId).select("-password");

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);

  } catch (error) {
    console.error("Error en perfilUsuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
