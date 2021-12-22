import { ordersAtlasDAO } from "./DAOs/mongo";
import { logger } from "../../utils/logs";

export const TipoPersistencia = {
  Memoria: "MEM",
  LocalMongo: "LOCAL-MONGO",
  MongoAtlas: "MONGO-ATLAS",
};

export class ordersFactoryDAO {
  static get(TipoPersistencia) {
    switch (TipoPersistencia) {
      case TipoPersistencia.MongoAtlas:
        logger.info("RETORNANDO INSTANCIA CLASE MONGO ATLAS ORDENES");
        return new ordersAtlasDAO();

      case TipoPersistencia.LocalMongo:
        logger.info("RETORNANDO INSTANCIA CLASE MONGO LOCAL ORDENES");
        return new ordersAtlasDAO(true);

      default:
        logger.info("Retornando Instancia Orders Default ORDENES");
        return new ordersAtlasDAO();
    }
  }
}
