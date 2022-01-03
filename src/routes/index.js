import { Router } from "express";
import productoRouter from "./productos";
import carritoRouter from "./carrito";
import userRouter from "./user";
import AuthRouter from "./auth";
import ordenesRouter from "./ordenes";
import { ensureToken } from "../middleware/auth";
import { isLoggedIn } from "../middleware/auth";
import chatRouter from "./chat"
const router = Router();

router.use("/auth", AuthRouter);
router.use("/productos",isLoggedIn, productoRouter);
router.use("/carrito", carritoRouter);
router.use("/orders", ordenesRouter);
router.use("/users", userRouter);
router.use("/chat",chatRouter)

export default router;
