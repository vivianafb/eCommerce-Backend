import { check } from "express-validator";
import { validationResult } from "express-validator";

const validateResultUser = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(404).json({
      msg: err.array(),
    });
  }
};
export const validateUser = [
  check("username").exists().not().isEmpty(),
  check("firstName").exists().not().isEmpty(),
  check("lastName").exists().not().isEmpty(),
  check("phone").exists().not().isEmpty(),
  check("email").exists().not().isEmpty(),
  check("password").exists().not().isEmpty(),
  check("confirmPassword").exists().not().isEmpty(),
  (req, res, next) => {
    validateResultUser(req, res, next);
  },
];
