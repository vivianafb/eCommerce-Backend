"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarritoFBDAO = void 0;

var _db = require("../../../services/db");

class CarritoFBDAO {
  async get(id) {
    if (!id) {
      let resultado = await _db.CarritoDB.get();
      let docs = resultado.docs;
      const output = docs.map(aDoc => ({
        id: aDoc.id,
        data: aDoc.data()
      }));
      return output;
    } else {
      let result = await _db.CarritoDB.doc(id).get(); //si no existe devolver error o algo asi

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
      const CarritoDocument = _db.CarritoDB.doc();

      await CarritoDocument.create(data);
      console.log("Carrito agregado!");
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  } // async update(id,data) {
  //     const miDoc = CarritoDB.doc(id);    
  //     console.log(miDoc);
  //     //Chequear si existe sino no seguir.
  //     await CarritoDB.doc(id).update(data);
  //     console.log('Producto actualizado');
  // }


  async delete(id) {
    await _db.CarritoDB.doc(id).delete();
    console.log('Carrito eliminado');
  }

}

exports.CarritoFBDAO = CarritoFBDAO;