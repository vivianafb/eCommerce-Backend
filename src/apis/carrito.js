import { FactoryDAO } from '../models/carritos/carrito.factory';
import { TipoPersistencia } from '../models/carritos/carrito.factory';

const tipo = TipoPersistencia.MongoAtlas;

class carAPI {
    carrito;

  constructor() {
    this.carrito = FactoryDAO.get(tipo);
  }

  async getCarrito(id) {
    if (id){
    return this.carrito.get(id);
    }
    return this.carrito.get();
  }

  async addCarrito(carritoData) {
    const newCarrito = await this.carrito.add(carritoData);
    return newCarrito;
  }

  async updateCarrito(id, carritoData) {
    const updatedCarrito = await this.carrito.update(id, carritoData);
    return updatedCarrito;
  }

  async deleteCarrito(id) {
    await this.carrito.delete(id);
  }

  async query(options) {
    return await this.carrito.query(options);
  }
}

export const carritoAPI = new carAPI();