import passport from "passport";
import passportLocal from "passport-local";
import { UserAPI } from "../apis/user";
import { logger } from "../utils/logs";
import { Gmail } from "../services/gmail";

const admin = true;
//Validar que el usuario es admin
export const checkAdmin = (req, res, next) => {
  logger.info("EJECUTANDO MIDDLEWARE");
  if (admin) next();
  else {
    res.status(401).json({
      error: -1,
      descripcion: `Ruta: ${req.url}`,
      metodo: `${req.method} no autorizada`,
    });
  }
};
const LocalStrategy = passportLocal.Strategy;

const strategyOptions = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

const loginFunc = async (req, username, password, done) => {
  const user = await UserAPI.query(username);
  if (!user) {
    logger.warn(`Login Fail for username ${username}: User does not exist`);
    return done(null, false, { message: "User does not exist" });
  }

  if (!(await UserAPI.ValidatePassword(username, password))) {
    logger.warn(`Login Fail for username ${username}: Password is not valid`);
    return done(null, false, { message: "Password is not valid." });
  }

  logger.info(`User ${username} logged in at ${new Date()}`);

  return done(null, user);
};

const signUpFunc = async (req, username, password, done) => {
  try {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      phone,
      confirmPassword,
    } = req.body;

    const user = await UserAPI.query(username, email);
    if (!username || !password || !email || !firstName || !lastName || !phone) {
      console.log("Invalid body fields");
      return done(null, false);
    }
    if (!(await UserAPI.ValidateSecondPassword(password, confirmPassword))) {
      logger.warn(
        `Login Fail for username ${username}: Confirm Password is not valid`
      );
      return done(null, false, { message: "Confirm Password is not valid." });
    }
    if (user) {
      logger.warn("User already exists");
      return done(null, false);
    } else {
      const gmailService = new Gmail("gmail");
      const content = `
        Nombre: ${username},
        Email:${email},
        FirstName:${firstName},
        LastName:${lastName}
        Phone:${phone} `;

      gmailService.sendEmail(email, "Nuevo Registro ", content);

      const newUser = await UserAPI.addUser(req.body);

      logger.info("Usuario registrado");
      return done(null, newUser);
    }
  } catch (error) {
    logger.error(error.message);
    done(error);
  }
};

passport.use("login", new LocalStrategy(strategyOptions, loginFunc));
passport.use("signup", new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const result = await UserAPI.getUsers(userId);
    done(null, result);
  } catch (err) {
    done(err);
  }
});

export const isLoggedIn = (req, res, done) => {
  if (!req.user) return res.status(401).json({ msg: "Unathorized" });

  done();
};

export const isAdmin = (req, res, done) => {
  if (!req.user) return res.status(401).json({ msg: "Unathorized" });

  done();
};

export const ensureToken = (req, res, next) => {
  const BearerToken = req.headers["authorization"];

  if (typeof BearerToken !== "undefined") {
    const bearer = BearerToken.split(" ");
    const bearerTok = bearer[1];
    console.log(`TOKEN : ${bearerTok}`);
    req.token = bearerTok;
    next();
  } else {
    res.status(403).json({ msg: "No permitido" });
  }
};

export default passport;
