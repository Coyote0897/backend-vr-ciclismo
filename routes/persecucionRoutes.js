import express from "express";
import { crearPersecucion, obtenerPersecuciones } from "../controllers/persecucionController.js";

const router = express.Router();

router.get("/", obtenerPersecuciones);
router.post("/", crearPersecucion);

export default router;
