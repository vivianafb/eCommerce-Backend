import mongoose, { Schema } from "mongoose";
import Config from "../../../config/index";
import { logger } from "../../../utils/logs";
const carritoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  productos: [
    {
      _id: Schema.Types.ObjectId,
      amount: Number,
    },
  ],
  time: { type: Date, default: Date.now },
});

export class CarritoAtlasDAO {
  srv;
  carrito;

  constructor(local) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_URL;
    mongoose.connect(this.srv);
    this.carrito = mongoose.model("carritos", carritoSchema);
  }
  async get(id) {
    try {
      const result = await this.carrito.findOne({ id });
      if (result) return result;
    } catch (err) {
      logger.warn("id not found");
    }
  }

  async createCart(userId) {
    const newCarrito = new this.carrito({
      userId,
      productos: [],
    });
    console.log(newCarrito);
    await newCarrito.save();

    return newCarrito;
  }

  async productExist(cartId, productId) {
    const cart = await this.carrito.findOne({ cartId });
     const index = cart.productos.findIndex(
      (aProduct) => aProduct._id == productId
    );

    if (index < 0) return false;

    return true;
  }

  async addProduct(carritoID, product) {
    const cart = await this.carrito.findById(carritoID);
    if (!cart) throw new Error("Cart not found");

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
    if (!cart) logger.error("Cart not found");

    const index = cart.productos.findIndex(
      (aProduct) => aProduct._id == product._id
    );

    if (index < 0) logger.warn("Product not found");

    if (cart.productos[index].amount <= product.amount)
      cart.productos.splice(index, 1);
    else cart.productos[index].amount -= product.amount;

    await cart.save();
    return cart;
  }

  async deleteProductCarrito(cartId) {
    const cart = await this.carrito.findById(cartId);
    if (!cart) logger.error("Cart not found");

    if (cart.productos) {
      cart.productos = [];
    }
    await cart.save();
    return cart;
  }

  async deleteCarrito(cartId) {
    await this.carrito.findByIdAndDelete(cartId);
  }
}
