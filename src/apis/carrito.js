import { FactoryDAO } from '../models/carritos/carrito.factory';
import { TipoPersistencia } from '../models/carritos/carrito.factory';
import { logger } from '../utils/logs';
import { productsAPI } from './productos';
import { UserAPI } from './user';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.MongoAtlas;

class carAPI {
    carrito;

  constructor() {
    this.carrito = FactoryDAO.get(tipo);
  }

  async getCarrito(userId) {
   return this.carrito.get(userId);
  }

  async createCarrito(userId) {
    const user = await UserAPI.getUsers(userId);
    if (!user.length)
      logger.warn('User does not exist. Error creating cart');
      
    const newCarrito = await this.carrito.createCart(userId);
    return newCarrito;
  }

  async addProduct(cartId,productId,amount) {
    const product = (await productsAPI.getProducts(productId))[0];

    const addProduct = {
      _id: productId,
      nombre: product.nombre,
      precio: product.precio,
      descripcion: product.descripcion,
      codigo: product.codigo,
      foto: product.foto,
      stock: product.stock,
      amount,
    };

    const updatedCart = await this.carrito.addProduct(cartId, addProduct);
    return updatedCart;
  }

  async deleteProudct(cartId, productId, amount) {
    const product = (await productsAPI.getProducts(productId))[0];

    const deleteProduct = {
      _id: productId,
      amount,
    };

    const updatedCart = await this.carrito.deleteProduct(cartId, deleteProduct);
    return updatedCart;
  }

  async deleteAll(cartId) {
    const updatedCart = await this.carrito.deleteProductCarrito(cartId);
    return updatedCart;

  }

  async deleteCarrito(cartId) {
        console.log(cartId)

    await this.carrito.deleteCarrito(cartId);

  }
}

export const carritoAPI = new carAPI();