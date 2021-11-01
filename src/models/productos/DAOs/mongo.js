import mongoose from 'mongoose';
import Config from '../../../config/index'

const productsSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String,
  codigo: Number,
  foto: String,
  stock:Number
});
export class ProductosAtlasDAO  {
   srv;
   productos;

   constructor(local) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(this.srv,{useNewUrlParser: true},);
    this.productos = mongoose.model('producto', productsSchema);
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

  async query(options){
    let query = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.precio) query.precio = options.precio;
 
    return this.productos.find(query);
  }
}

