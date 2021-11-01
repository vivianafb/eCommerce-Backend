import  {Router} from 'express';
import { carritoController } from '../controllers/carritoController';
import { checkAdmin,checkUsuario } from '../middleware/admin';
const router = Router();

router.get('/',
checkAdmin,checkUsuario, 
carritoController.checkCarritoExists,
carritoController.getCarrito);

router.get('/:id',
checkAdmin,checkUsuario, 
carritoController.checkCarritoExists,
carritoController.getCarrito);

router.post('/agregar',
checkAdmin,checkUsuario,
carritoController.validacion, carritoController.addCarrito);

router.delete('/borrar/:id',
checkAdmin,checkUsuario, 
carritoController.checkCarritoExists,
carritoController.deleteCarrito);

export default router;