import { ordersFactoryDAO } from "../models/ordenes/ordenes.factory";
import { TipoPersistencia } from "../models/ordenes/ordenes.factory";
import { logger } from "../utils/logs";
import { productsAPI } from "./productos";
import { UserAPI } from "./user";
const tipo = TipoPersistencia.MongoAtlas;

class orderAPI {
  order;

  constructor() {
    this.order = ordersFactoryDAO.get(tipo);
  }

  async getOrder(userId) {
    if (userId) {
      return this.order.get(userId);
    } else {
      return this.order.get();
    }
  }

  async createOrder(userId, items, total, numOrder) {
    // console.log(items)
    let dato = [];
    for (let i = 0; i < items.length; i++) {
      dato.push({
        producto: items[i].productName,
        cantidad: items[i].productAmount,
        precio: items[i].productPrice,
      });
    }

    // console.log(dato)
    const newOrder = await this.order.add(userId, dato, total, numOrder);
    return newOrder;
  }

  async updateOrder(id, data) {
    const updateOrder = await this.order.update(id, data);
    return updateOrder;
  }
}
export const orderApi = new orderAPI();
