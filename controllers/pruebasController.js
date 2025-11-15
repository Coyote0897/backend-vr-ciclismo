import Prueba from "../models/Prueba.js";

// 📌 Crear prueba — SOLO ADMIN
export const crearPrueba = async (req, res) => {
  try {
    const nueva = await Prueba.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    console.error("Error crearPrueba:", error);
    res.status(500).json({ message: "Error al crear prueba" });
  }
};

// 📌 Obtener TODAS — PÚBLICO (NO requiere login)
export const obtenerPruebas = async (req, res) => {
  try {
    const pruebas = await Prueba.find().sort({ createdAt: -1 });
    res.json(pruebas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pruebas" });
  }
};

// 📌 Obtener una — PÚBLICO
export const obtenerPrueba = async (req, res) => {
  try {
    const prueba = await Prueba.findById(req.params.id);

    if (!prueba) {
      return res.status(404).json({ message: "Prueba no encontrada" });
    }

    res.json(prueba);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener prueba" });
  }
};

// 📌 ACTUALIZAR — SOLO ADMIN
export const actualizarPrueba = async (req, res) => {
  try {
    const prueba = await Prueba.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!prueba) {
      return res.status(404).json({ message: "Prueba no encontrada" });
    }

    res.json(prueba);

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar prueba" });
  }
};

// 📌 ELIMINAR — SOLO ADMIN
export const eliminarPrueba = async (req, res) => {
  try {
    const eliminado = await Prueba.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ message: "Prueba no encontrada" });
    }

    res.json({ message: "Prueba eliminada correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar prueba" });
  }
};
