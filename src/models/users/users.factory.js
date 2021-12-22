import { UsuarioAtlasDAO } from "./DAOs/mongo";
import { logger } from "../../utils/logs";

export const TipoPersistencia = {
  Memoria: "MEM",
  FileSystem: "FS",
  MYSQL: "MYSQL",
  SQLITE3: "SQLITE3",
  LocalMongo: "LOCAL-MONGO",
  MongoAtlas: "MONGO-ATLAS",
};

export class userFactoryDAO {
  static get(TipoPersistencia) {
    switch (TipoPersistencia) {
      case TipoPersistencia.MongoAtlas:
        logger.info("RETORNANDO INSTANCIA CLASE MONGO ATLAS");
        return new UsuarioAtlasDAO();

      case TipoPersistencia.LocalMongo:
        logger.info("RETORNANDO INSTANCIA CLASE MONGO LOCAL");
        return new UsuarioAtlasDAO(true);

      default:
        logger.info("Retornando Instancia Users Default");
        return new UsuarioAtlasDAO();
    }
  }
}
