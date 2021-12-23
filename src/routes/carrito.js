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

router.post(
  "/agregar",
  checkAdmin,
  validateCarrito,
  expressAsyncHandler(carritoController.addProduct)
);

router.post(
  "/comprar",
  checkAdmin,
  expressAsyncHandler(carritoController.comprarProduct)
);

router.delete(
  "/borrar/:id",
  checkAdmin,
  expressAsyncHandler(carritoController.deleteProduct)
);

export default router;
