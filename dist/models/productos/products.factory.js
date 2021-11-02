"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoticiasFactoryDAO = exports.TipoPersistencia = void 0;

var _memory = require("./DAOs/memory");

var _fs = require("./DAOs/fs");

var _mongo = require("./DAOs/mongo");

var _mysql = require("./DAOs/mysql");

var _sqlite = require("./DAOs/sqlite");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TipoPersistencia = {
  Memoria: "MEM",
  FileSystem: "FS",
  MYSQL: "MYSQL",
  SQLITE3: "SQLITE3",
  LocalMongo: "LOCAL-MONGO",
  MongoAtlas: "MONGO-ATLAS"
};
exports.TipoPersistencia = TipoPersistencia;
const tipo = TipoPersistencia;

class NoticiasFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE FS');

        const filePath = _path.default.resolve(__dirname, './DAOs/products.json');

        return new _fs.ProductosFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new _mongo.ProductosAtlasDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new _mongo.ProductosAtlasDAO(true);

      case TipoPersistencia.MYSQL:
        console.log('RETORNANDO INSTANCIA CLASE MYSQL/MariDB LOCAL');
        return new _mysql.ProductosSQLDAO();

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO INSTANCIA CLASE SQLITE');
        return new _sqlite.ProductosSQLITEDAO();

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new _memory.ProductosMemDAO();
    }
  }

}

exports.NoticiasFactoryDAO = NoticiasFactoryDAO;