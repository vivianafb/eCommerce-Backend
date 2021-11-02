"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductosAtlasDAO = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("../../../config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productsSchema = new _mongoose.default.Schema({
  nombre: String,
  precio: Number,
  descripcion: String,
  codigo: Number,
  foto: String,
  stock: Number
});

class ProductosAtlasDAO {
  srv;
  productos;

  constructor(local) {
    if (local) this.srv = `mongodb://localhost:27017/${_index.default.MONGO_LOCAL_DBNAME}`;else this.srv = `mongodb+srv://${_index.default.MONGO_ATLAS_USER}:${_index.default.MONGO_ATLAS_PASSWORD}@${_index.default.MONGO_ATLAS_CLUSTER}/${_index.default.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;

    _mongoose.default.connect(this.srv, {
      useNewUrlParser: true
    });

    this.productos = _mongoose.default.model('producto', productsSchema);
  }

  async get(id) {
    let output = [];

    try {
      if (id) {
        const document = await this.productos.findById(id);
        console.log(document);
        if (document) output.push(document);
      } else {
        output = await this.productos.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data) {
    const newProduct = new this.productos(data);
    await newProduct.save();
    return newProduct;
  }

  async update(id, newProductData) {
    return this.productos.findByIdAndUpdate(id, newProductData);
  }

  async delete(id) {
    await this.productos.findByIdAndDelete(id);
  }

  async query(options) {
    let query = {};
    if (options.nombre) query.nombre = options.nombre;
    if (options.precio) query.precio = options.precio;
    return this.productos.find(query);
  }

}

exports.ProductosAtlasDAO = ProductosAtlasDAO;