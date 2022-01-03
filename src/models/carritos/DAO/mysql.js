import knex from "knex";
import dbConfig from "./../../../../knexfile";

export class CarritoSQLDAO {
  constructor() {
    const environment = process.env.NODE_ENV || "development";
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  init() {
    this.connection.schema.hasTable("carrito").then((exists) => {
      if (exists) return;
      console.log("Creamos la tabla carrito!");

      return this.connection.schema.createTable("carrito", (carritoTable) => {
        carritoTable.increments();
        carritoTable.timestamp("createdAt").defaultTo(knex.fn.now());
        carritoTable
          .integer("producto_id")
          .unsigned()
          .references("id")
          .inTable("productos");
      });
    });
  }

  async get(id) {
    if (id) return this.connection("carrito").where("id", id);

    return this.connection("carrito");
  }

  async add(data) {
    return this.connection("carrito").insert(data);
  }

  // async update( id, data) {
  //   return this.connection('carrito').where('id', id).update(data);
  // }

  async delete(id) {
    return this.connection("carrito").where("id", id).del();
  }
}
