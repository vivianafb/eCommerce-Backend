import { Router } from "express";
import productoRouter from "./productos";
import carritoRouter from "./carrito";
import userRouter from "./user";
import AuthRouter from "./auth";
import ordenesRouter from "./ordenes";
import { isLoggedIn } from "../middleware/auth";
import { ensureToken } from "../middleware/auth";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/productos", productoRouter);
router.use("/carrito", ensureToken, carritoRouter);
router.use("/orders", ensureToken, ordenesRouter);
router.use("/users", userRouter);

export default router;
