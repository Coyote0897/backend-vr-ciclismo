import Persecucion from "../models/persecucionModel.js";

export const crearPersecucion = async (req, res) => {
  try {
    const nuevo = await Persecucion.create(req.body);

    res.status(201).json({
      message: "Resultado de persecución guardado correctamente",
      data: nuevo
    });
  } catch (error) {
    console.error("Error al guardar persecución:", error);
    res.status(500).json({ message: "Error interno", error });
  }
};

export const obtenerPersecuciones = async (req, res) => {
  try {
    const datos = await Persecucion.find().sort({ createdAt: -1 });
    res.json(datos);
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
};
