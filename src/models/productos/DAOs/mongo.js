import mongoose from 'mongoose';
import Config from '../../../config/index'

const productsSchema = new mongoose.Schema({
  nombre: {type: String, required: true},
  precio: {type: Number, required:true},
  descripcion:{type: String, required:true, unique: true},
  codigo: {type: Number, required:true},
  foto: {type: String, required:true},
  stock: {type: Number, required:true}
});
export class ProductosAtlasDAO  {
   srv;
   productos;

   constructor(local) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = Config.MONGO_ATLAS_URL;
    mongoose.connect(this.srv);
    this.productos = mongoose.model('productos', productsSchema);
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
    // if (!data.nombre || !data.precio || !data.descripcion
    //   || !data.codigo || !! data.foto || !data.stock) throw new Error('invalid data');
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

