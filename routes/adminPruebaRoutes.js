import express from "express";
import {
  crearPrueba,
  obtenerPruebas,
  actualizarPrueba,
  eliminarPrueba
} from "../controllers/adminPruebaController.js";

import { authMiddleware, requiereRol } from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren ADMIN
router.use(authMiddleware);
router.use(requiereRol(["admin"]));

router.get("/", obtenerPruebas);
router.post("/", crearPrueba);
router.put("/:id", actualizarPrueba);
router.delete("/:id", eliminarPrueba);

export default router;
