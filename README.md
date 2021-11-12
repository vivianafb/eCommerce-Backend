
# eCommerce-Backend

Proyecto Final del curso "Programacion Backend" en Coderhouse

Rutas:

Registro: http://localhost:8080/api/auth/signup
Inicio De Sesion: http://localhost:8080/api/auth/login
Cerrar Sesion: http://localhost:8080/api/auth/logout

Body Postman: {
    "username":"",
    "email":"",
    "password":"",
    "firstName":"",
    "lastName":"",
    "adress":" ",
    "age":,
    "phone":,
    "photo":""
}

Productos: http://localhost:8080/api/productos/
Agregar Productos: http://localhost:8080/api/productos/agregar/:id
Actualizar Productos: http://localhost:8080/api/productos/actualizar/:id
Body Postman: {
    "id":, 
    "nombre":"", 
    "precio":, 
    "descripcion":"",
    "codigo":,
    "foto":"",
    "stock":
   }

Carrito Personal: http://localhost:8080/api/carrito/
Carrito Agregar Productos: http://localhost:8080/api/carrito/agregar
Comprar: http://localhost:8080/api/carrito/comprar

Body Postman: {
    "productId":"",
    "productAmount":
}