import express from "express";
import { body } from "express-validator";
import {
  registrarUsuario,
  loginUsuario,
  logoutUsuario,
  perfilUsuario,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Validaciones
const validarRegistro = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("Correo inválido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
];

const validarLogin = [
  body("email").isEmail().withMessage("Correo inválido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

// RUTAS
router.post("/register", validarRegistro, registrarUsuario);
router.post("/login", validarLogin, loginUsuario);
router.post("/logout", logoutUsuario);

// Ruta protegida de ejemplo
router.get("/perfil", authMiddleware, perfilUsuario);

export default router;
