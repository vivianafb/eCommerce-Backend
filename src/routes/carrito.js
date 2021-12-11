import  {Router} from 'express';
import { carritoController } from '../controllers/carritoController';
import { checkAdmin } from '../middleware/auth';
import expressAsyncHandler from 'express-async-handler';
const router = Router();

router.get('/',
checkAdmin, 
expressAsyncHandler(carritoController.getCartByUser));

router.get('/:id',
checkAdmin,carritoController.checkCarritoExists,
expressAsyncHandler(carritoController.getCartByUser));

router.post('/agregar',
checkAdmin, 
expressAsyncHandler(carritoController.addProduct));

router.post('/comprar',
checkAdmin, 
expressAsyncHandler(carritoController.comprarProduct));


router.delete('/borrar/:id',
checkAdmin, 
expressAsyncHandler(carritoController.deleteProduct));

export default router;