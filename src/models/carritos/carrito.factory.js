import { CarritoMemDAO } from './DAO/memory';
import { CarritoFSDAO } from './DAO/fs';
import { CarritoAtlasDAO } from './DAO/mongo';
import { CarritoSQLDAO } from './DAO/mysql';
import { CarritoSQLITEDAO } from './DAO/sqlite';
import { CarritoFBDAO } from './DAO/firebase';

import path from 'path';
export const TipoPersistencia = {
  Memoria : "MEM",
  FileSystem : "FS",
  MYSQL : "MYSQL",
  SQLITE3 : "SQLITE3",
  LocalMongo : "LOCAL-MONGO",
  MongoAtlas : "MONGO-ATLAS",
  Firebase : "FIREBASE",
}
const tipo = TipoPersistencia;
export class FactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE FS');
        const filePath = path.resolve(__dirname, './DAO/carrito.json');
        return new CarritoFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new CarritoAtlasDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new CarritoAtlasDAO(true);

      case TipoPersistencia.MYSQL:
        console.log('RETORNANDO INSTANCIA CLASE MYSQL/MariDB LOCAL');
        return new CarritoSQLDAO();

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO INSTANCIA CLASE SQLITE');
        return new CarritoSQLITEDAO();

      case TipoPersistencia.Firebase:
        console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
        return new CarritoFBDAO();
    
      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new CarritoMemDAO();
    }
  }
}