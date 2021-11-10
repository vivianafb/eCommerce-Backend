import  {Router} from 'express';
import { carritoController } from '../controllers/carritoController';
import { checkAdmin } from '../middleware/auth';
import expressAsyncHandler from 'express-async-handler';
const router = Router();

router.get('/',
checkAdmin, 
carritoController.checkCarritoExists,
expressAsyncHandler(carritoController.getCartByUser));

router.get('/:id',
checkAdmin,carritoController.checkCarritoExists,
expressAsyncHandler(carritoController.getCartByUser));

router.post('/agregar',
checkAdmin,
carritoController.validacion, 
expressAsyncHandler(carritoController.addProduct));

router.delete('/borrar/:id',
checkAdmin, 
carritoController.checkCarritoExists,
expressAsyncHandler(carritoController.deleteProduct));

export default router;