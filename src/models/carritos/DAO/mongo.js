import mongoose, {Schema} from 'mongoose';
import Config from '../../../config/index'
import { logger } from '../../../utils/logs';

const carritoSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  productos: [
    {
      _id: Schema.Types.ObjectId,
      amount: Number,
    },
  ],
});

export class CarritoAtlasDAO{
    srv;
    carrito;
 
    constructor(local) {
     if (local)
       this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
     else
       this.srv = Config.MONGO_ATLAS_URL;
     mongoose.connect(this.srv);
     this.carrito = mongoose.model('carritos', carritoSchema);
   }
   async get(userId) {
    const result = await this.carrito.findOne({userId});
    // console.log(result)
    if (!result) logger.warn('id not found');

    return result;
   }
 
   async createCart(userId) {
    const newCarrito = new this.carrito({
      userId,
      productos: [],
    });

    await newCarrito.save();

    return newCarrito;
  }

  productExist(cart, productId)  {
    const index = cart.productos.findIndex(
      (aProduct) => aProduct._id == productId
    );

    if (index < 0) return false;

    return true;
  }

  async addProduct(carritoID, product) {
    const cart = await this.carrito.findById(carritoID);
    if (!cart) throw new Error('Cart not found');

    const index = cart.productos.findIndex(
      (aProduct) => aProduct._id == product._id
    );

    if (index < 0) cart.productos.push(product);
    else cart.productos[index].amount += product.amount;

    await cart.save();

    return cart;
  }
 
  async deleteProduct(carritoID, product) {
    const cart = await this.carrito.findById(carritoID);
    if (!cart) logger.error('Cart not found');

    const index = cart.productos.findIndex(
      (aProduct) => aProduct._id == product._id
    );

    if (index < 0) logger.warn('Product not found');

    if (cart.productos[index].amount <= product.amount)
      cart.productos.splice(index, 1);
    else cart.productos[index].amount -= product.amount;

    await cart.save();
    return cart;
  }
  

  async deleteProductCarrito(cartId,productosCarrito){
    const cart = await this.carrito.findById(cartId);
    if (!cart) logger.error('Cart not found');

   if(cart.productos){
     cart.productos = []
   }
   await cart.save();
    return cart;
  }

  async deleteCarrito(cartId){
    await this.carrito.findByIdAndDelete(cartId);

  }
}