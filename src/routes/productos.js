import { Router } from "express";
import { productoController } from "../controllers/productoController";
import { checkAdmin } from "../middleware/auth";
import expressAsyncHandler from "express-async-handler";
import upload from "../utils/multer";
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Producto:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *        precio:
 *          type: number
 *        descripcion:
 *          type: string
 *        codigo:
 *          type: number
 *        fotos:
 *           type: array
 *           items:
 *            type: string
 *            format: binary
 *        stock:
 *          type: number
 *        categoria:
 *          type: string
 *      required:
 *        - nombre
 *        - precio
 *        - descripcion
 *        - codigo
 *        - fotos
 *        - stock
 *        - categoria
 *      example:
 *        nombre: PRODUCTO1
 *        precio: 1000
 *        descripcion: 'blanco'
 *        codigo: 123
 *        fotos: {url:["https://res.cloudinary.com/dfunjm3sr/image/upload/v1641156428/q9cuch1wcxdkf01sukri.jpg"]}
 *        stock: 100
 *        categoria: ropa
 *        cloudinary_id: {public_id:["q9cuch1wcxdkf01sukri"]}
 */

/**
 *
 * @swagger
 * /api/productos:
 *  get:
 *    summary: Get all the products
 *    tags: [Producto]
 *    responses:
 *      200:
 *        description: List of products
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      400:
 *        description: Product not found
 */
router.get("/", expressAsyncHandler(productoController.getProducto));

/**
 *
 * @swagger
 * /api/productos/{id}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimun: 1
 *    summary: Get the product with the id
 *    tags: [Producto]
 *    responses:
 *      200:
 *        description: Product found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      400:
 *        description: Product not found
 */
router.get("/:id", expressAsyncHandler(productoController.getProducto));

/**
 *
 * @swagger
 * /api/productos/categoria/{categoria}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: categoria
 *        required: true
 *        schema:
 *          type: string
 *          minimun: 1
 *    summary: Get the product by the category
 *    tags: [Producto]
 *    responses:
 *      200:
 *        description: List of products with the required category
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      400:
 *        description: Product not found
 */
router.get(
  "/categoria/:categoria",
  expressAsyncHandler(productoController.getCategoria)
);

/**
 *
 * @swagger
 * /api/productos/agregar:
 *  post:
 *    summary: Add product
 *    tags: [Producto]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Producto'
 *    responses:
 *      200:
 *        description: Product added succesfuly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      400:
 *        description: There was an error
 */
router.post(
  "/agregar",
  upload.any('fotos'),
  expressAsyncHandler(productoController.addProducto)
);

/**
 * @swagger
 * components:
 *  schemas:
 *    Productos:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *        precio:
 *          type: number
 *        descripcion:
 *          type: string
 *        codigo:
 *          type: number
 *        foto:
 *          type: string
 *          format: binary
 *        stock:
 *          type: number
 *        categoria:
 *          type: string
 *      example:
 *        nombre: PRODUCTO1
 *        precio: 1000
 *        descripcion: 'blanco'
 *        codigo: 123
 *        foto:
 *        stock: 100
 *        categoria: ropa
 */

/**
 *
 * @swagger
 * /api/productos/actualizar/{id}:
 *  put:
 *    summary: Update the product
 *    tags: [Producto]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimun: 1
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Productos'
 *    responses:
 *      200:
 *        description: Product updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Productos'
 *      400:
 *        description: There was an error
 */
router.put(
  "/actualizar/:id",
  upload.any('fotos'),
  checkAdmin,
  expressAsyncHandler(productoController.updateProducto)
);

/**
 *
 * @swagger
 * /api/productos/borrar/{id}:
 *  delete:
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimun: 1
 *    summary: Delete the product with the id
 *    tags: [Producto]
 *    responses:
 *      200:
 *        description: The product was deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      400:
 *        description: Product not found
 */
router.delete(
  "/borrar/:id",
  checkAdmin,
  expressAsyncHandler(productoController.deleteProducto)
);

export default router;
