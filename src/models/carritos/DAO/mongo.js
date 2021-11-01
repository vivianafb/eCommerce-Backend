import mongoose from 'mongoose';
import Config from '../../../config/index'

const carritoSchema = new mongoose.Schema({
  id: String,
  createdAt: Number,
  producto_id: Number
})
export class CarritoAtlasDAO{
    srv;
    carrito;
 
    constructor(local) {
     if (local)
       this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
     else
       this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
     mongoose.connect(this.srv,{useNewUrlParser: true},);
     this.carrito = mongoose.model('carrito', carritoSchema);
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
   }
//  async update(id, newCarritoData) {
//      return this.carrito.findByIdAndUpdate(id, newCarritoData);
//    }
   
 
   async delete(id) {
     await this.carrito.findByIdAndDelete(id);
   }
 
   async query(options){
     let query = {};
 
     if (options.nombre) query.nombre = options.nombre;
 
     if (options.precio) query.precio = options.precio;
  
     return this.productos.find(query);
   }
}