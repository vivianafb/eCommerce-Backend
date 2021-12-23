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
 *    summary: Login a user into the app
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
 *        description: User loggin correctly
 *            
 */
router.post("/login", passport.authenticate("login"), function (req, res) {
  const user = req.user;
  const token = jwt.sign({ user }, config.JWT_SECRET_KEY);
  res.json(token);
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
 *        username: edu
 *        firstName: Eduardo
 *        lastName: Soledad
 *        phone: '+569123456'
 *        email: edu@gmail.com
 *        password: '123456'
 *        confirmPassword: '123456'
 */


/**
 * 
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: Sign up into the app
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

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(500).json({ message: "Ocurrió un error" });
    else {
      res.json({ message: "Logout exitoso" });
    }
  });
});
export default router;
