import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No autorizado, falta token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioId = decoded.uid;
    req.usuarioRol = decoded.rol;

    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Middleware opcional para roles
export const requiereRol = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuarioRol)) {
      return res.status(403).json({ message: "No tienes permisos suficientes" });
    }
    next();
  };
};
