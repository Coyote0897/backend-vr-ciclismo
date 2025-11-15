import { Router } from "express";
import { body } from "express-validator";
import {
  crearTiempoReal,
  obtenerTiemposReales,
  obtenerTiempoReal,
  editarTiempoReal,
  eliminarTiempoReal,
} from "../controllers/tiemposRealesController.js";

import { authMiddleware, requiereRol } from "../middlewares/authMiddleware.js";

const router = Router();

// ⭐ Validaciones
const validacionesTiempo = [
  body("prueba").notEmpty().withMessage("La prueba es obligatoria"),
  body("tiempoTotal").isNumeric().withMessage("El tiempo es obligatorio"),
  body("categoria").notEmpty().withMessage("Categoría requerida"),
  body("genero").isIn(["Masculino", "Femenino"]).withMessage("Género inválido"),
  body("deportista").notEmpty().withMessage("Nombre requerido"),
  body("fechaPrueba").notEmpty().withMessage("Fecha requerida"),
];

// ⭐ Rutas públicas
router.get("/", obtenerTiemposReales);
router.get("/:id", obtenerTiempoReal);

// ⭐ Rutas con auth y solo admin
router.post(
  "/",
  authMiddleware,
  requiereRol(["admin"]),
  validacionesTiempo,
  crearTiempoReal
);

router.put(
  "/:id",
  authMiddleware,
  requiereRol(["admin"]),
  editarTiempoReal
);

router.delete(
  "/:id",
  authMiddleware,
  requiereRol(["admin"]),
  eliminarTiempoReal
);

export default router;
