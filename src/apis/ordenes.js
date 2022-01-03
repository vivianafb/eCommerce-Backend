import { ordersFactoryDAO } from "../models/ordenes/ordenes.factory";
import { TipoPersistencia } from "../models/ordenes/ordenes.factory";
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

  async getOrderById(id) {
    if (id) {
      return this.order.getById(id);
    } else {
      return this.order.getById();
    }
  }

  async createOrder(userId, items, total, numOrder, data) {
    let dato = [];
    for (let i = 0; i < items.length; i++) {
      dato.push({
        producto: items[i].productName,
        cantidad: items[i].productAmount,
        precio: items[i].productPrice,
      });
    }
    const direccion = {
      Comuna: data.Comuna,
      Pasaje: data.Pasaje,
      NumeroCasa: data.NumeroCasa,
      CodigoPostal: data.CodigoPostal,
      Piso: data.Piso,
      Departamento: data.Departamento,
    };

    const newOrder = await this.order.add(
      userId,
      dato,
      total,
      numOrder,
      direccion
    );
    return newOrder;
  }

  async updateOrder(id, data) {
    const updateOrder = await this.order.update(id, data);
    return updateOrder;
  }
}
export const orderApi = new orderAPI();
