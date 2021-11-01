import  {Router} from 'express';
import { productoController } from '../controllers/productoController';
import { checkAdmin, checkUsuario } from '../middleware/admin';
import expressAsyncHandler from 'express-async-handler';
const router = Router();

router.get('/',
checkAdmin,checkUsuario, 
productoController.checkProductExists,
expressAsyncHandler(productoController.getProducto)
);

router.get('/:id',
checkAdmin,checkUsuario, 
productoController.checkProductExists,
expressAsyncHandler(productoController.getProducto)
);

router.post('/agregar',
checkAdmin,productoController.validacion, 
productoController.checkProductExists,
expressAsyncHandler(productoController.addProducto)
);

router.put('/actualizar/:id', 
checkAdmin,
productoController.checkProductExists,
expressAsyncHandler(productoController.updateProducto)
);

router.delete('/borrar/:id',
checkAdmin,
productoController.checkProductExists,
expressAsyncHandler(productoController.deleteProducto)
);

export default router;