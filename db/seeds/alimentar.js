exports.seed = function (knex) {
    const initProducts = [
      { 
         id:1,
         nombre:"lapiz", 
          precio:100, 
          descripcion:"color rojo",
          codigo:123456,
          foto:"https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg?size=338&ext=jpg",
          stock:27
      },
      {
        id:2,
        nombre:"goma", 
        precio:200, 
        descripcion:"goma de borrar",
        codigo:789123,
        foto:"https://www.libreriaservicom.cl/wp-content/uploads/2019/03/goma-de-borrar-factis-s20.jpg",
        stock:30
      },
    ];

    const initCarrito = [
      {
        id:1,
        createdAt: Date.now(),
        producto_id:1
      }
    ]
  
    return knex('carrito')
      .del()
      .then(() => knex('productos').del())
      .then(() => knex('productos').insert(initProducts))
      .then(() => knex('carrito').insert(initCarrito));

  };
  
  