"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarritoDB = exports.ProductoDB = void 0;

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _firebase = _interopRequireDefault(require("../../firebase.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert(_firebase.default)
});

const db = _firebaseAdmin.default.firestore();

const ProductoDB = db.collection('productos');
exports.ProductoDB = ProductoDB;
const CarritoDB = db.collection('carrito');
exports.CarritoDB = CarritoDB;