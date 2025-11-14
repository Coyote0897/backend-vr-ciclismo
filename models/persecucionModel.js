import mongoose from "mongoose";

const persecucionSchema = new mongoose.Schema({
  tipoPrueba: { type: String, default: "persecucion" },

  tiempoTotal: { type: Number, required: true },

  tiemposPorVuelta: { type: [Number], default: [] },

  edad: { type: Number, required: true },
  genero: { type: String, required: true },

  fecha: { type: String, required: true }

}, { timestamps: true });

export default mongoose.model("Persecucion", persecucionSchema);
