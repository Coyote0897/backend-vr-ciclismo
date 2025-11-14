import mongoose from "mongoose";

const resultadoSchema = new mongoose.Schema({
  tipoPrueba: { type: String, required: true },
  tiempoTotal: { type: Number, required: true },

  velocidadPromedio: { type: Number, default: 0 },
  velocidadesSensor: { type: [Number], default: [] },
  tiemposPorVuelta: { type: [Number], default: [] },

  edad: { type: Number, required: true },
  genero: { type: String, required: true },

  fecha: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Resultado", resultadoSchema);
