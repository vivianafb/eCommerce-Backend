import { Router } from "express";
import productoRouter from "./productos";
import carritoRouter from "./carrito";
import userRouter from "./user";
import AuthRouter from "./auth";
import ordenesRouter from "./ordenes";
import { isLoggedIn } from "../middleware/auth";

import chatRouter from "./chat";
const router = Router();

router.use("/auth", AuthRouter);
router.use("/productos", productoRouter);
router.use("/carrito", isLoggedIn, carritoRouter);
router.use("/orders", isLoggedIn, ordenesRouter);
router.use("/users", isLoggedIn, userRouter);
router.use("/chat", chatRouter);

export default router;
