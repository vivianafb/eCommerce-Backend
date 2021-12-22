import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { GmailService } from "../services/gmail";
import config from "../config/index";
import { ensureToken } from "../middleware/auth";
const router = Router();

router.post("/login", passport.authenticate("login"), function (req, res) {
  const user = req.user;
  const token = jwt.sign({ user }, config.JWT_SECRET_KEY);
  res.json(token);
});

router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", function (err, data, info) {
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
