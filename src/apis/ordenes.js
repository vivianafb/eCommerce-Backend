import {ordersFactoryDAO} from '../models/ordenes/ordenes.factory'
import { TipoPersistencia } from '../models/ordenes/ordenes.factory';
import { logger } from '../utils/logs';
import { productsAPI } from './productos';
import { UserAPI } from './user';
const tipo = TipoPersistencia.MongoAtlas;

class orderAPI{
    order;

    constructor() {
        this.order = ordersFactoryDAO.get(tipo);
    }

    async getOrder(userId) {
        return this.order.get(userId);
       }
      
}
export const orderApi = new orderAPI();