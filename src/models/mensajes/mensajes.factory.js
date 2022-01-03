import { MensajeAtlasDAO } from "./DAOs/mongo";

import { logger } from "../../utils/logs";
export const TipoPersistencia = {
  LocalMongo: "LOCAL-MONGO",
  MongoAtlas: "MONGO-ATLAS",
};
const tipo = TipoPersistencia;
export class MensajeFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        logger.info("RETORNANDO INSTANCIA CLASE MONGO ATLAS");
        return new MensajeAtlasDAO();

      case TipoPersistencia.LocalMongo:
        logger.info("RETORNANDO INSTANCIA CLASE MONGO LOCAL");
        return new MensajeAtlasDAO(true);

      default:
        logger.info("Retornando Instancia Orders Default ORDENES");
        return new ordersAtlasDAO();
    }
  }
}
