"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductosSQLDAO = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _knexfile = _interopRequireDefault(require("./../../../../knexfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductosSQLDAO {
  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    console.log(`SETTING ${environment} DB`);
    const options = _knexfile.default[environment];
    this.connection = (0, _knex.default)(options);
  }

  init() {
    this.connection.schema.hasTable('productos').then(exists => {
      if (exists) return;
      console.log('Creamos la tabla productos!');
      return this.connection.schema.createTable('productos', productosTable => {
        productosTable.increments();
        productosTable.string('nombre').notNullable();
        productosTable.decimal('precio', 4, 2);
        productosTable.string('descripcion').notNullable();
        productosTable.integer('codigo').notNullable();
        productosTable.string('foto').notNullable();
        productosTable.integer('stock').notNullable();
        productosTable.timestamp('createdAt').defaultTo(_knex.default.fn.now());
      });
    });
  }

  async get(id) {
    if (id) return this.connection('productos').where('id', id);
    return this.connection('productos');
  }

  async add(data) {
    return this.connection('productos').insert(data);
  }

  async update(id, data) {
    return this.connection('productos').where('id', id).update(data);
  }

  async delete(id) {
    return this.connection('productos').where('id', id).del();
  }

}

exports.ProductosSQLDAO = ProductosSQLDAO;