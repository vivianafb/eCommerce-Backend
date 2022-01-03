import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/index";
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 *      required:
 *        - username
 *        - password
 *      example:
 *        username: vivivi
 *        password: '123456'
 */

/**
 *
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login to the app
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Successful login
 *
 */
router.post("/login", passport.authenticate("login"), function (req, res) {
  const user = req.user;
  // const token = jwt.sign({ user }, config.JWT_SECRET_KEY);
  res.json(user);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        phone:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        confirmPassword:
 *          type: string
 *      required:
 *        - username
 *        - firstName
 *        - lastName
 *        - phone
 *        - email
 *        - password
 *        - confirmPassword
 *      example:
 *        username: sole
 *        firstName: Soledad
 *        lastName: Fajardo
 *        phone: '122424244'
 *        email: sole@gmail.com
 *        password: '12345678'
 *        confirmPassword: '12345678'
 */

/**
 *
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: The user registers in the app
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User sign up correctly
 *
 */
router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", function (err, data) {
    if (err) {
      return next(err);
    }
    if (!data) return res.status(401).json({ msg: "El usuario ya existe" });

    res.json({ msg: "signup OK", data: data });
  })(req, res, next);
});

/**
 *
 * @swagger
 * /api/auth/logout:
 *  get:
 *    summary: Log out
 *    tags: [User]
 *    responses:
 *      200:
 *        description: You have successfully logged out
 *
 */
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(500).json({ message: "Ocurrió un error" });
    else {
      res.json({ message: "Logout exitoso" });
    }
  });
});
export default router;
