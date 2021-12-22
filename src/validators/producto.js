import { check } from "express-validator";
import { validationResult } from "express-validator";

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(404).json({
      msg: err.array(),
    });
  }
};
export const validateProducto = [
  check("nombre").exists().not().isEmpty(),
  check("precio").exists().not().isEmpty(),
  check("descripcion").exists().not().isEmpty(),
  check("codigo").exists().not().isEmpty(),
  check("foto").exists().not().isEmpty(),
  check("stock").exists().not().isEmpty(),
  check("categoria").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
