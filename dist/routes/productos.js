"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _productoController = require("../controllers/productoController");

var _admin = require("../middleware/admin");

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get('/', _admin.checkAdmin, _admin.checkUsuario, _productoController.productoController.checkProductExists, (0, _expressAsyncHandler.default)(_productoController.productoController.getProducto));
router.get('/:id', _admin.checkAdmin, _admin.checkUsuario, _productoController.productoController.checkProductExists, (0, _expressAsyncHandler.default)(_productoController.productoController.getProducto));
router.post('/agregar', _admin.checkAdmin, _productoController.productoController.validacion, _productoController.productoController.checkProductExists, (0, _expressAsyncHandler.default)(_productoController.productoController.addProducto));
router.put('/actualizar/:id', _admin.checkAdmin, _productoController.productoController.checkProductExists, (0, _expressAsyncHandler.default)(_productoController.productoController.updateProducto));
router.delete('/borrar/:id', _admin.checkAdmin, _productoController.productoController.checkProductExists, (0, _expressAsyncHandler.default)(_productoController.productoController.deleteProducto));
var _default = router;
exports.default = _default;