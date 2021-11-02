"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarritoAtlasDAO = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("../../../config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carritoSchema = new _mongoose.default.Schema({
  id: String,
  createdAt: Number,
  producto_id: Number
});

class CarritoAtlasDAO {
  srv;
  carrito;

  constructor(local) {
    if (local) this.srv = `mongodb://localhost:27017/${_index.default.MONGO_LOCAL_DBNAME}`;else this.srv = `mongodb+srv://${_index.default.MONGO_ATLAS_USER}:${_index.default.MONGO_ATLAS_PASSWORD}@${_index.default.MONGO_ATLAS_CLUSTER}/${_index.default.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;

    _mongoose.default.connect(this.srv, {
      useNewUrlParser: true
    });

    this.carrito = _mongoose.default.model('carrito', carritoSchema);
  }

  async get(id) {
    let output = [];

    try {
      if (id) {
        const document = await this.carrito.findById(id);
        console.log(document);
        if (document) output.push(document);
      } else {
        output = await this.carrito.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data) {
    //  if (!data.nombre || !data.precio) throw new Error('invalid data');
    const newCarrito = new this.carrito(data);
    await newCarrito.save();
    return newCarrito;
  } //  async update(id, newCarritoData) {
  //      return this.carrito.findByIdAndUpdate(id, newCarritoData);
  //    }


  async delete(id) {
    await this.carrito.findByIdAndDelete(id);
  }

  async query(options) {
    let query = {};
    if (options.nombre) query.nombre = options.nombre;
    if (options.precio) query.precio = options.precio;
    return this.productos.find(query);
  }

}

exports.CarritoAtlasDAO = CarritoAtlasDAO;