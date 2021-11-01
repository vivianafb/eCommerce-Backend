exports.up = function (knex) {
    return knex.schema
      .createTable('productos', (productosTable) => {
        productosTable.increments();
        productosTable.string('nombre').notNullable();
        productosTable.integer('precio');
        productosTable.string('descripcion').notNullable();
        productosTable.integer('codigo').notNullable();
        productosTable.string('foto').notNullable();
        productosTable.integer('stock').notNullable();
        productosTable.timestamp('createdAt').defaultTo(knex.fn.now());
        
      })
      .createTable('carrito', (carritoTable) => {  
        carritoTable.increments();
        carritoTable.timestamp('createdAt').defaultTo(knex.fn.now());
        carritoTable
        .integer('producto_id')
        .unsigned()
        .references('id')
        .inTable('productos')
      })
};   
      
  
  exports.down = function (knex) {
    return knex.schema.dropTable('carrito').dropTable('productos');
  };
  