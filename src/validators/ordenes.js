import { check } from "express-validator";
import { validationResult } from "express-validator";

const validateResultOrder = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(404).json({
      msg: err.array(),
    });
  }
};
export const validateOrder = [
  check("id").exists().not().isEmpty(),
  (req, res, next) => {
    validateResultOrder(req, res, next);
  },
];
