import Resultado from "../models/kilometroModel.js";

export const crearResultadoKilometro = async (req, res) => {
  try {
    console.log("📥 Datos recibidos:", req.body);

    const nuevo = await Resultado.create(req.body);

    res.status(201).json({
      message: "Resultado de kilómetro guardado correctamente",
      data: nuevo
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear resultado", error });
  }
};

export const obtenerResultados = async (req, res) => {
  try {
    const resultados = await Resultado.find().sort({ createdAt: -1 });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener resultados", error });
  }
};
