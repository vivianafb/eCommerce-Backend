
# eCommerce-Backend

Proyecto Final del curso "Programacion Backend" en Coderhouse

Rutas:

## Usuario: 

- http://localhost:8080/api/auth/signup

- http://localhost:8080/api/auth/login

- http://localhost:8080/api/auth/logout

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

## Productos: 

- http://localhost:8080/api/productos/

- http://localhost:8080/api/productos/agregar/:id 

- http://localhost:8080/api/productos/actualizar/:id

Body Postman: {
    "id":, 
    "nombre":"", 
    "precio":, 
    "descripcion":"",
    "codigo":,
    "foto":"",
    "stock":
   }

## Carrito: 

- http://localhost:8080/api/carrito/

- http://localhost:8080/api/carrito/agregar

- http://localhost:8080/api/carrito/comprar


Body Postman: {
    "productId":"",
    "productAmount":
}