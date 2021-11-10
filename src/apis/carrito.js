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

  async getCarrito(id) {
   return this.carrito.get(id);
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
      amount,
    };

    const updatedCart = await this.carts.addProduct(cartId, addProduct);
    return updatedCart;
  }

  async deleteProudct(cartId, productId, amount) {
    const product = (await productsAPI.getProducts(productId))[0];

    const deleteProduct = {
      _id: productId,
      nombre: product.nombre,
      precio: product.precio,
      amount,
    };

    const updatedCart = await this.carts.deleteProduct(cartId, deleteProduct);
    return updatedCart;
  }
}

export const carritoAPI = new carAPI();