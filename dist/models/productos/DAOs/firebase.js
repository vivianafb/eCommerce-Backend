"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductosFBDAO = void 0;

var _db = require("../../../services/db");

class ProductosFBDAO {
  async get(id) {
    if (!id) {
      let resultado = await _db.ProductoDB.get();
      let docs = resultado.docs;
      const output = docs.map(aDoc => ({
        id: aDoc.id,
        data: aDoc.data()
      }));
      return output;
    } else {
      let result = await _db.ProductoDB.doc(id).get(); //si no existe devolver error o algo asi

      if (id) {
        return {
          data: result.data()
        };
      } else {
        return console.log("error");
      }
    }
  }

  async add(data) {
    try {
      const ProductoDocument = _db.ProductoDB.doc();

      await ProductoDocument.create(data);
      console.log("Producto agregado!");
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  }

  async update(id, data) {
    const miDoc = _db.ProductoDB.doc(id); //Chequear si existe sino no seguir.


    await _db.ProductoDB.doc(id).update(data);
    console.log('Producto actualizado');
  }

  async delete(id) {
    await _db.ProductoDB.doc(id).delete();
    console.log('Producto eliminado');
  }

}

exports.ProductosFBDAO = ProductosFBDAO;