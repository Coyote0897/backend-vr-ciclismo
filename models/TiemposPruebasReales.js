import mongoose from "mongoose";

const TiemposRealesSchema = new mongoose.Schema({
  prueba: {
    type: String,
    required: true,  // kilometro • persecucion • velocidad200 • etc
  },
  tiempoTotal: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true, // Sub-17 • Elite • Master • etc
  },
  genero: {
    type: String,
    enum: ["Masculino", "Femenino"],
    required: true,
  },
  deportista: {
    type: String,
    required: true,
  },
  fechaPrueba: {
    type: Date,
    required: true,
  },
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },

  creadoEn: { type: Date, default: Date.now },
});

export default mongoose.model("TiempoReal", TiemposRealesSchema);

