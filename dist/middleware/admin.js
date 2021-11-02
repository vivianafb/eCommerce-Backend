"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUsuario = exports.checkAdmin = void 0;
const admin = true;
const user = true;

const checkAdmin = (req, res, next) => {
  if (admin) next();else {
    res.status(401).json({
      error: -1,
      descripcion: `Ruta: ${req.url}`,
      metodo: `${req.method} no autorizada`
    });
  }
};

exports.checkAdmin = checkAdmin;

const checkUsuario = (req, res, next) => {
  if (user) next();else {
    res.status(401).json({
      error: -1,
      descripcion: `Ruta: ${req.url}`,
      metodo: `${req.method} no autorizada`
    });
  }
};

exports.checkUsuario = checkUsuario;