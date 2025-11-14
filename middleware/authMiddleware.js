import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Token desde Header (Bearer) o cookie
    const token =
      req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No autorizado. Falta token." });
    }

    // Verificar JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjuntar info al request
    req.usuarioId = decoded.uid;
    req.usuarioRol = decoded.rol;

    next();
  } catch (error) {
    console.error("❌ Error en authMiddleware:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Middleware para roles
export const requiereRol = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuarioRol)) {
      return res.status(403).json({ message: "No tienes permisos suficientes" });
    }
    next();
  };
};
