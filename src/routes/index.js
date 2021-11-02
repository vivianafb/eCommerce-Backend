import { Router } from "express";
import productoRouter from './productos';
import carritoRouter from './carrito';
import userRouter from './user';
import { isLoggedIn } from '../middleware/auth';
import passport from 'passport';

const router = Router();

router.use('/productos',productoRouter);
router.use('/carrito',carritoRouter);
router.use('/users',isLoggedIn, userRouter);

router.post('/login',passport.authenticate('login'), function (req,res) {
     res.json(req.user);
});

router.post('/signup',passport.authenticate('login'), function (req,res) {
    res.json(req.user);
});

export default router;