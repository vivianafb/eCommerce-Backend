"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FactoryDAO = exports.TipoPersistencia = void 0;

var _memory = require("./DAO/memory");

var _fs = require("./DAO/fs");

var _mongo = require("./DAO/mongo");

var _mysql = require("./DAO/mysql");

var _sqlite = require("./DAO/sqlite");

var _firebase = require("./DAO/firebase");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TipoPersistencia = {
  Memoria: "MEM",
  FileSystem: "FS",
  MYSQL: "MYSQL",
  SQLITE3: "SQLITE3",
  LocalMongo: "LOCAL-MONGO",
  MongoAtlas: "MONGO-ATLAS",
  Firebase: "FIREBASE"
};
exports.TipoPersistencia = TipoPersistencia;
const tipo = TipoPersistencia;

class FactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE FS');

        const filePath = _path.default.resolve(__dirname, './DAO/carrito.json');

        return new _fs.CarritoFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new _mongo.CarritoAtlasDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new _mongo.CarritoAtlasDAO(true);

      case TipoPersistencia.MYSQL:
        console.log('RETORNANDO INSTANCIA CLASE MYSQL/MariDB LOCAL');
        return new _mysql.CarritoSQLDAO();

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO INSTANCIA CLASE SQLITE');
        return new _sqlite.CarritoSQLITEDAO();

      case TipoPersistencia.Firebase:
        console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
        return new _firebase.CarritoFBDAO();

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new _memory.CarritoMemDAO();
    }
  }

}

exports.FactoryDAO = FactoryDAO;