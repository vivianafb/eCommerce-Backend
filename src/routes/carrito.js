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
 *        description: Carrito load correctly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Carrito'
 *      400:     
 *        description: Not found
 */
router.get(
  "/",
  checkAdmin,
  expressAsyncHandler(carritoController.getCartByUser)
);

router.get(
  "/:id",
  checkAdmin,
  carritoController.checkCarritoExists,
  expressAsyncHandler(carritoController.getCartByUser)
);

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
 *        description: Error
 */
router.post(
  "/agregar",
  checkAdmin,
  validateCarrito,
  expressAsyncHandler(carritoController.addProduct)
);


/**
 * @swagger
 * components:
 *  schemas:
 *    Orden:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        items:
 *          type: array
 *        estado:
 *          type: string
 *        total:
 *          type: string
 *        numOrder: 
 *          type: string
 *      required:
 *        - userId
 *        - items
 *        - estado
 *        - total
 *        - numOrder
 *      example:
 *        userId: 61c3c50e642badd8ee4ee9cd
 *        items: [ {producto: PRODUCTO3, cantidad: 50, precio: 15000, _id: 61c50de36ade12968795c231}]
 *        estado: Generado
 *        total: 750000
 *        numOrder: 1
 */

/**
 * 
 * @swagger
 * /api/carrito/comprar:
 *  post:
 *    summary: Buy productos from the cart
 *    tags: [Carrito]
 *    responses:
 *      200:
 *        description: Successful purchase
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Orden'
 *      400:     
 *        description: Error
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
