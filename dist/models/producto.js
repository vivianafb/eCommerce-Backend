"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productos = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productosSchema = new _mongoose.default.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true,
    unique: true
  },
  codigo: {
    type: Number,
    required: true
  },
  foto: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
});
const productos = new _mongoose.default.model('productos', productosSchema);
exports.productos = productos;