import Prueba from "../models/Prueba.js";

// Crear prueba (ADMIN)
export const crearPrueba = async (req, res) => {
  try {
    const nueva = await Prueba.create(req.body);
    res.status(201).json({
      message: "Prueba creada correctamente",
      prueba: nueva
    });
  } catch (error) {
    console.log("Error crearPrueba:", error);
    res.status(500).json({ message: "Error al crear prueba" });
  }
};

// Listar pruebas (ADMIN)
export const obtenerPruebas = async (req, res) => {
  try {
    const pruebas = await Prueba.find().sort({ createdAt: -1 });
    res.json(pruebas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pruebas" });
  }
};

// Actualizar prueba (ADMIN)
export const actualizarPrueba = async (req, res) => {
  try {
    const prueba = await Prueba.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!prueba) {
      return res.status(404).json({ message: "Prueba no encontrada" });
    }

    res.json({
      message: "Prueba actualizada correctamente",
      prueba
    });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar prueba" });
  }
};

// Eliminar prueba (ADMIN)
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
