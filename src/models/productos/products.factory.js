import { ProductosMemDAO } from './DAOs/memory';
import { ProductosFSDAO } from './DAOs/fs';
import { ProductosAtlasDAO } from './DAOs/mongo';
import { ProductosSQLDAO } from './DAOs/mysql';
import { ProductosSQLITEDAO } from './DAOs/sqlite';
import { logger } from '../../utils/logs';

import path from 'path';
export const TipoPersistencia = {
  Memoria : "MEM",
  FileSystem : "FS",
  MYSQL : "MYSQL",
  SQLITE3 : "SQLITE3",
  LocalMongo : "LOCAL-MONGO",
  MongoAtlas : "MONGO-ATLAS",
}
const tipo = TipoPersistencia;
export class NoticiasFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        logger.info('RETORNANDO INSTANCIA CLASE FS');
        const filePath = path.resolve(__dirname, './DAOs/products.json');
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        logger.info('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new ProductosAtlasDAO();

      case TipoPersistencia.LocalMongo:
        logger.info('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new ProductosAtlasDAO(true);

      case TipoPersistencia.MYSQL:
        console.log('RETORNANDO INSTANCIA CLASE MYSQL/MariDB LOCAL');
        return new ProductosSQLDAO();

      case TipoPersistencia.SQLITE3:
        logger.info('RETORNANDO INSTANCIA CLASE SQLITE');
        return new ProductosSQLITEDAO();
    
      default:
        logger.info('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductosMemDAO();
    }
  }
}