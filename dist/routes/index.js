"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _productos = _interopRequireDefault(require("./productos"));

var _carrito = _interopRequireDefault(require("./carrito"));

var _user = _interopRequireDefault(require("./user"));

var _auth = require("../middleware/auth");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/productos', _productos.default);
router.use('/carrito', _carrito.default);
router.use('/users', _auth.isLoggedIn, _user.default);
router.post('/login', _passport.default.authenticate('login'), function (req, res) {
  res.json(req.user);
});
router.post('/signup', _passport.default.authenticate('login'), function (req, res) {
  res.json(req.user);
});
var _default = router;
exports.default = _default;