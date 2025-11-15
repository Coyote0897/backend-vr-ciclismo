import TiempoReal from "../models/TiemposPruebasReales.js";
import { validationResult } from "express-validator";

// ⭐ CREAR TIEMPO REAL (solo admin)
export const crearTiempoReal = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const nuevo = await TiempoReal.create({
      ...req.body,
      creadoPor: req.usuarioId,
    });

    res.status(201).json({
      message: "Tiempo registrado correctamente",
      tiempo: nuevo,
    });

  } catch (error) {
    console.error("Error en crearTiempoReal:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// ⭐ OBTENER TODOS LOS TIEMPOS (público)
export const obtenerTiemposReales = async (req, res) => {
  try {
    const tiempos = await TiempoReal.find().sort({ creadoEn: -1 });
    res.json(tiempos);
  } catch (error) {
    console.error("Error en obtenerTiemposReales:", error);
    res.status(500).json({ message: "Error al obtener los tiempos" });
  }
};

// ⭐ OBTENER UN TIEMPO
export const obtenerTiempoReal = async (req, res) => {
  try {
    const tiempo = await TiempoReal.findById(req.params.id);

    if (!tiempo) {
      return res.status(404).json({ message: "Tiempo no encontrado" });
    }

    res.json(tiempo);
  } catch (error) {
    console.error("Error en obtenerTiempoReal:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// ⭐ EDITAR (solo admin)
export const editarTiempoReal = async (req, res) => {
  try {
    const tiempo = await TiempoReal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!tiempo) return res.status(404).json({ message: "No encontrado" });

    res.json({
      message: "Tiempo actualizado",
      tiempo,
    });

  } catch (error) {
    console.error("Error en editarTiempoReal:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// ⭐ ELIMINAR (solo admin)
export const eliminarTiempoReal = async (req, res) => {
  try {
    const tiempo = await TiempoReal.findByIdAndDelete(req.params.id);
    if (!tiempo) {
      return res.status(404).json({ message: "Tiempo no encontrado" });
    }

    res.json({ message: "Tiempo eliminado correctamente" });

  } catch (error) {
    console.error("Error en eliminarTiempoReal:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
