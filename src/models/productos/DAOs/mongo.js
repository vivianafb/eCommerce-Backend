import mongoose from "mongoose";
import Config from "../../../config/index";
import { logger } from "../../../utils/logs";

const productsSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoria: { type: String, required: true },
  foto: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
});

productsSchema.pre("save", function (next) {
  var data = this;
  var pro = mongoose.model("productos");
  pro.find({ nombre: data.nombre, codigo: data.codigo }, function (err, docs) {
    if (!docs.length) {
      next();
    } else {
      logger.warn("El Producto existe ", data.nombre, data.codigo);
      next(
        new Error(`El producto ya existe!  Nombre producto: ${data.nombre}`)
      );
    }
  });
});

export class ProductosAtlasDAO {
  srv;
  productos;

  constructor(local) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_URL;
    mongoose.connect(this.srv);
    this.productos = mongoose.model("productos", productsSchema);
  }

  async get(id) {
    let output = [];
    try {
      if (id) {
        const document = await this.productos.findById(id);
        if (document) output.push(document);
      } else {
        output = await this.productos.find();
      }
      return output;
    } catch (err) {
      return output;
    }
  }

  async getCat(categoria) {
    let output = [];
    try {
      if (categoria) {
        const document = await this.productos.find({ categoria: categoria });
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

    if (options.categoria) query.categoria = options.categoria;

    return this.productos.find(query);
  }
}
