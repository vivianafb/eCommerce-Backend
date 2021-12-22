import { check } from "express-validator";
import { validationResult } from "express-validator";

const validateResultCarrito = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(404).json({
      msg: err.array(),
    });
  }
};
export const validateCarrito = [
  check("productId").exists().not().isEmpty(),
  check("productAmount").exists().not().isEmpty(),
  (req, res, next) => {
    validateResultCarrito(req, res, next);
  },
];
