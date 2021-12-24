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
 *    Carrito:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        productos:
 *          type: array
 *        direccion:
 *          type: array
 *      required:
 *        - userId
 *        - productos
 *        - direccion
 *      example:
 *        userId: 61c3c50e642badd8ee4ee9cd
 *        productos: [ {_id:61c362b40112611202e0797d, amount: 30}]
 *        direccion: ''
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
 *              $ref: '#/components/schemas/Carrito'
 *      400:
 *        description: Carrito not found
 */
router.get(
  "/",
  checkAdmin,
  expressAsyncHandler(carritoController.getCartByUser)
);

// router.get(
//   "/:id",
//   checkAdmin,
//   carritoController.checkCarritoExists,
//   expressAsyncHandler(carritoController.getCartByUser)
// );

/**
 * @swagger
 * components:
 *  schemas:
 *    Carrito:
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
 *            $ref: '#/components/schemas/Carrito'
 *    responses:
 *      200:
 *        description: Product added to the cart correctly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Carrito'
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

// router.delete(
//   "/borrar/:id",
//   checkAdmin,
//   expressAsyncHandler(carritoController.deleteProduct)
// );

export default router;
