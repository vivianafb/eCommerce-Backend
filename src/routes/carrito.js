import { Router } from "express";
import { carritoController } from "../controllers/carritoController";
import { checkAdmin } from "../middleware/auth";
import expressAsyncHandler from "express-async-handler";
import { validateCarrito } from "../validators/carrito";
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Carritos:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        productos:
 *          type: array
 *      required:
 *        - userId
 *        - productos
 *      example:
 *        userId: 61c3c50e642badd8ee4ee9cd
 *        productos: [ {_id:61c362b40112611202e0797d, amount: 30}]
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    DireccionCompra:
 *      type: object
 *      properties:
 *        Comuna:
 *          type: string
 *        Pasaje:
 *          type: string
 *        NumeroCasa:
 *          type: string
 *        CodigoPostal:
 *          type: string
 *        Piso:
 *          type: string
 *        Departamento:
 *          type: string
 *      required:
 *        - Comuna
 *        - Pasaje
 *        - NumeroCasa
 *        - CodigoPostal
 *        - Piso
 *        - Departamento
 *      example:
 *        Comuna: Santiago Centro
 *        Pasaje: Avenida Apoquindo
 *        NumeroCasa: 1202
 *        CodigoPostal: 30004
 *        Piso: 11
 *        Departamento: 1110
 */

/**
 *
 * @swagger
 * /api/carrito:
 *  get:
 *    summary: Get the carrito by UserId
 *    tags: [Carrito]
 *    responses:
 *      200:
 *        description: Carrito loaded correctly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Carritos'
 *      400:
 *        description: Carrito not found
 */
router.get(
  "/",
  checkAdmin,
  expressAsyncHandler(carritoController.getCartByUser)
);

/**
 * @swagger
 * components:
 *  schemas:
 *    ProductoCarrito:
 *      type: object
 *      properties:
 *        productId:
 *          type: string
 *        productAmount:
 *          type: number
 *      required:
 *        - productId
 *        - productAmount
 *      example:
 *        productId: 61c23e82f6fbe4dc466131d7
 *        productAmount: 5
 */

/**
 *
 * @swagger
 * /api/carrito/agregar:
 *  post:
 *    summary: Add products to the cart
 *    tags: [Carrito]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/ProductoCarrito'
 *    responses:
 *      200:
 *        description: Product added to the cart correctly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Carritos'
 *      400:
 *        description: There was an error , product wasn't added to the cart
 */
router.post(
  "/agregar",
  checkAdmin,
  validateCarrito,
  expressAsyncHandler(carritoController.addProduct)
);

/**
 *
 * @swagger
 * /api/carrito/comprar:
 *  post:
 *    summary: Buy the products that are in the cart
 *    tags: [Carrito]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/DireccionCompra'
 *    responses:
 *      200:
 *        description: Successful purchase
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        description: There was an error in the purchase
 */
router.post(
  "/comprar",
  checkAdmin,
  expressAsyncHandler(carritoController.comprarProduct)
);

/**
 *
 * @swagger
 * /api/carrito/borrar/{productId}:
 *  delete:
 *    summary: Delete a product from the cart
 *    tags: [Carrito]
 *    parameters:
 *      - in: path
 *        name: productId
 *        required: true
 *        schema:
 *          type: string
 *          minimun: 1
 *    responses:
 *      200:
 *        description: Product deleted succesfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Carritos'
 *      400:
 *        description: There was an error
 */
router.delete(
  "/borrar/:productId",
  checkAdmin,
  expressAsyncHandler(carritoController.deleteProduct)
);

export default router;
