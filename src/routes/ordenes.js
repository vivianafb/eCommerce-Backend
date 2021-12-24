import { Router } from "express";
import { ordersController } from "../controllers/ordenesController";
import { checkAdmin } from "../middleware/auth";
import expressAsyncHandler from "express-async-handler";
// import { validateOrder } from "../validators/ordenes";
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        items:
 *          type: array
 *        estado:
 *          type: string
 *        total:
 *          type: number
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
 * /api/orders/{id}:
 *  get:
 *    summary: Get the order by id of the order
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimun: 1
 *    tags: [Order]
 *    responses:
 *      200:
 *        description: Order gotten correctly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        description: Order not found, the id doesn't exists
 */
router.get("/", checkAdmin, expressAsyncHandler(ordersController.getOrders));

/**
 *
 * @swagger
 * /api/orders:
 *  get:
 *    summary: Get the orders of the current user
 *    tags: [Order]
 *    responses:
 *      200:
 *        description: Orders gotten correctly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        description: Not found
 */
router.get("/:id", expressAsyncHandler(ordersController.getOrdersById));

/**
 *
 * @swagger
 * /api/orders/complete/{id}:
 *  post:
 *    summary: Submit the order
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimun: 1
 *    tags: [Order]
 *    responses:
 *      200:
 *        description: The order status is complete
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        description: There was an error
 */
router.post(
  "/complete/:id",
  checkAdmin,
  expressAsyncHandler(ordersController.submit)
);

export default router;
