"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarritoSQLDAO = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _knexfile = _interopRequireDefault(require("./../../../../knexfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CarritoSQLDAO {
  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    console.log(`SETTING ${environment} DB`);
    const options = _knexfile.default[environment];
    this.connection = (0, _knex.default)(options);
  }

  init() {
    this.connection.schema.hasTable('carrito').then(exists => {
      if (exists) return;
      console.log('Creamos la tabla carrito!');
      return this.connection.schema.createTable('carrito', carritoTable => {
        carritoTable.increments();
        carritoTable.timestamp('createdAt').defaultTo(_knex.default.fn.now());
        carritoTable.integer('producto_id').unsigned().references('id').inTable('productos');
      });
    });
  }

  async get(id) {
    if (id) return this.connection('carrito').where('id', id);
    return this.connection('carrito');
  }

  async add(data) {
    return this.connection('carrito').insert(data);
  } // async update( id, data) {
  //   return this.connection('carrito').where('id', id).update(data);
  // }


  async delete(id) {
    return this.connection('carrito').where('id', id).del();
  }

}

exports.CarritoSQLDAO = CarritoSQLDAO;