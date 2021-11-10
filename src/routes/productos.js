import  {Router} from 'express';
import { productoController } from '../controllers/productoController';
import { checkAdmin } from '../middleware/auth';
import expressAsyncHandler from 'express-async-handler';
const router = Router();

router.get('/', 
productoController.checkProductExists,
expressAsyncHandler(productoController.getProducto)
);

router.get('/:id',
productoController.checkProductExists,
expressAsyncHandler(productoController.getProducto)
);

router.post('/agregar',
checkAdmin,
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