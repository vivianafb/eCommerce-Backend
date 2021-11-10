import { Router } from "express";
import productoRouter from './productos';
import carritoRouter from './carrito';
import userRouter from './user';
import AuthRouter from './auth'
import { isLoggedIn } from '../middleware/auth';


const router = Router();

router.use('/auth', AuthRouter);
router.use('/productos',productoRouter);
router.use('/carrito',isLoggedIn,carritoRouter);
router.use('/users',isLoggedIn, userRouter);


export default router;