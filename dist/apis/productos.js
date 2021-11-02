"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productsAPI = void 0;

var _products = require("../models/productos/products.factory");

const tipo = _products.TipoPersistencia.MongoAtlas;

class prodAPI {
  productos;

  constructor() {
    this.productos = _products.NoticiasFactoryDAO.get(tipo);
  }

  async getProducts(id) {
    if (id) return this.productos.get(id);
    return this.productos.get();
  }

  async addProduct(productData) {
    const newProduct = await this.productos.add(productData);
    return newProduct;
  }

  async updateProduct(id, productData) {
    const updatedProduct = await this.productos.update(id, productData);
    return updatedProduct;
  }

  async deleteProduct(id) {
    await this.productos.delete(id);
  }

  async query(options) {
    return await this.productos.query(options);
  }

}

const productsAPI = new prodAPI();
exports.productsAPI = productsAPI;