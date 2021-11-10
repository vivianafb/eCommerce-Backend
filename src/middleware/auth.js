import passport from 'passport';
import passportLocal from 'passport-local';
import {UserAPI} from '../apis/user'
import { logger} from'../utils/logs';

const admin = true;
//Validar que el usuario es admin
export const checkAdmin = (req,res,next) => {
  logger.info('EJECUTANDO MIDDLEWARE');
  if(admin) next();
  else{
      res.status(401).json({
          error: -1,
          descripcion: `Ruta: ${req.url}`,
          metodo: `${req.method} no autorizada`
      })
  }
}
const LocalStrategy = passportLocal.Strategy;

const strategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc = async (req, username, password, done) => {
  const user = await UserAPI.query(username);

  if (!user) {
    logger.warn(`Login Fail for username ${username}: User does not exist`);
    return done(null, false, { message: 'User does not exist' });
  }

  if (!(await UserAPI.ValidatePassword(username, password))) {
    logger.warn(`Login Fail for username ${username}: Password is not valid`);
    return done(null, false, { message: 'Password is not valid.' });
  }
  logger.info(`User ${username} logged in at ${new Date()}`);
  return done(null, user);
};

const signUpFunc = async (req, username, password, done) => {
  try {
    const { username, password, email, firstName, lastName, adress,age,phone,photo } = req.body;
    
    const user = await UserAPI.query(username,email);
    if (!username || !password || !email || !firstName || !lastName || !adress || !age || !phone || !photo) {
      console.log('Invalid body fields');
      return done(null, false);
    }

    if (user) {
      logger.warn('User already exists');
      return done(null, false);
    } else {
     
      const newUser = await UserAPI.addUser(req.body);
      return done(null, newUser);
    }
  } catch (error) {
    logger.error(error.message);
    done(error);
  }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  try {
    const result = UserAPI.getUsers(userId);
    done(null, result);
  } catch (err) {
    done(err);
  }
});

export const isLoggedIn = (req, res, done) => {
  if (!req.user) return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export const isAdmin = (req, res, done) => {
  if (!req.user) return res.status(401).json({ msg: 'Unathorized' });

  done();
};
export default passport;