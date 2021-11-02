import { ProductosMemDAO } from './DAOs/memory';
import { ProductosFSDAO } from './DAOs/fs';
import { ProductosAtlasDAO } from './DAOs/mongo';
import { ProductosSQLDAO } from './DAOs/mysql';
import { ProductosSQLITEDAO } from './DAOs/sqlite';

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
        console.log('RETORNANDO INSTANCIA CLASE FS');
        const filePath = path.resolve(__dirname, './DAOs/products.json');
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new ProductosAtlasDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new ProductosAtlasDAO(true);

      case TipoPersistencia.MYSQL:
        console.log('RETORNANDO INSTANCIA CLASE MYSQL/MariDB LOCAL');
        return new ProductosSQLDAO();

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO INSTANCIA CLASE SQLITE');
        return new ProductosSQLITEDAO();
    
      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductosMemDAO();
    }
  }
}