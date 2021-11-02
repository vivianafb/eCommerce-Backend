"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isLoggedIn = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _user = require("../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LocalStrategy = _passportLocal.default.Strategy;
const strategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
};

const loginFunc = async (req, username, password, done) => {
  const user = await _user.UserModel.findOne({
    username
  });

  if (!user) {
    return done(null, false, {
      message: 'User does not exist'
    });
  }

  if (!(await user.isValidPassword(password))) {
    return done(null, false, {
      message: 'Password is not valid.'
    });
  }

  console.log('SALIO TODO BIEN');
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
      adress,
      age,
      phone,
      photo
    } = req.body; // console.log(req.body);

    if (!username || !password || !email || !firstName || !lastName || !adress || !age || !phone || !photo) {
      console.log('Invalid body fields');
      return done(null, false);
    }

    const query = {
      $or: [{
        username: username
      }, {
        email: email
      }]
    };
    const user = await _user.UserModel.findOne(query);

    if (user) {
      console.log('User already exists');
      return done(null, false, 'User already exists');
    } else {
      const userData = {
        username,
        password,
        email,
        firstName,
        lastName,
        adress,
        age,
        phone,
        photo
      };
      const newUser = new _user.UserModel(userData);
      await newUser.save();
      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

_passport.default.use('login', new LocalStrategy(strategyOptions, loginFunc));

_passport.default.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

_passport.default.serializeUser((user, done) => {
  // console.log(user);
  done(null, user._id);
});

_passport.default.deserializeUser((userId, done) => {
  _user.UserModel.findById(userId, function (err, user) {
    done(err, user);
  });
});

const isLoggedIn = (req, res, done) => {
  if (!req.user) return res.status(401).json({
    msg: 'Unathorized'
  });
  done();
};

exports.isLoggedIn = isLoggedIn;
var _default = _passport.default;
exports.default = _default;