import { ordersAtlasDAO } from "./DAOs/mongo";
import {logger}  from '../../utils/logs'

export const TipoPersistencia = {
    Memoria : "MEM",
    LocalMongo : "LOCAL-MONGO",
    MongoAtlas : "MONGO-ATLAS",
  }
const tipo = TipoPersistencia;
export class ordersFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        logger.info('RETORNANDO INSTANCIA CLASE MONGO ATLAS ORDENES');
        return new ordersAtlasDAO();

      case TipoPersistencia.LocalMongo:
        logger.info('RETORNANDO INSTANCIA CLASE MONGO LOCAL ORDENES');
        return new ordersAtlasDAO(true);
        
    default:
        logger.info('Retornando Instancia Orders Default ORDENES');
        return new ordersAtlasDAO();
    }
  }
}