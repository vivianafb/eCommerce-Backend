"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _carritoController = require("../controllers/carritoController");

var _admin = require("../middleware/admin");

const router = (0, _express.Router)();
router.get('/', _admin.checkAdmin, _admin.checkUsuario, _carritoController.carritoController.checkCarritoExists, _carritoController.carritoController.getCarrito);
router.get('/:id', _admin.checkAdmin, _admin.checkUsuario, _carritoController.carritoController.checkCarritoExists, _carritoController.carritoController.getCarrito);
router.post('/agregar', _admin.checkAdmin, _admin.checkUsuario, _carritoController.carritoController.validacion, _carritoController.carritoController.addCarrito);
router.delete('/borrar/:id', _admin.checkAdmin, _admin.checkUsuario, _carritoController.carritoController.checkCarritoExists, _carritoController.carritoController.deleteCarrito);
var _default = router;
exports.default = _default;