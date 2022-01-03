const admin = true;

export const checkAdmin = (req, res, next) => {
  if (admin) next();
  else {
    res.status(401).json({
      error: -1,
      descripcion: `Ruta: ${req.url}`,
      metodo: `${req.method} no autorizada`,
    });
  }
};
