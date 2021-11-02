"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductosMemDAO = void 0;

class ProductosMemDAO {
  productos = [];

  constructor() {
    const mockData = [{
      id: 1,
      nombre: "lapiz",
      precio: 100,
      descripcion: "color rojo",
      codigo: 123456,
      foto: "https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg?size=338&ext=jpg",
      stock: 27,
      timestamp: Date.now()
    }, {
      id: 2,
      nombre: "goma",
      precio: 200,
      descripcion: "goma de borrar",
      codigo: 789123,
      foto: "https://www.libreriaservicom.cl/wp-content/uploads/2019/03/goma-de-borrar-factis-s20.jpg",
      stock: 30,
      timestamp: Date.now()
    }];
    mockData.forEach(aMock => this.productos.push(aMock));
  }

  findIndex(id) {
    return this.productos.findIndex(aProduct => aProduct.id == id);
  }

  find(id) {
    return this.productos.find(aProduct => aProduct.id == id);
  }

  async get(id) {
    if (id) {
      console.log(this.productos);
      return this.productos.filter(aProduct => aProduct.id == id);
    }

    return this.productos;
  }

  async add(data) {
    const newItem = {
      id: (this.productos.length + 1).toString(),
      nombre: data.nombre,
      precio: data.precio,
      descripcion: data.descripcion,
      codigo: data.codigo,
      foto: data.foto,
      stock: data.stock
    };
    this.productos.push(newItem);
    return newItem;
  }

  async update(id, newProductData) {
    const index = this.findIndex(id);
    const oldProduct = this.productos[index];
    const updatedProduct = { ...oldProduct,
      ...newProductData
    };
    this.productos.splice(index, 1, updatedProduct);
    return updatedProduct;
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.productos.splice(index, 1);
  }

  async query(options) {
    //   type Conditions = (aProduct: ProductI) => boolean;
    const query = [];
    if (options.nombre) query.push(aProduct => aProduct.nombre == options.nombre);
    if (options.precio) query.push(aProduct => aProduct.precio == options.precio);
    return this.productos.filter(aProduct => query.every(x => x(aProduct)));
  }

}

exports.ProductosMemDAO = ProductosMemDAO;