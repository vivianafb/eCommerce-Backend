import  {Router} from 'express';
import { productoController } from '../controllers/productoController';
import { checkAdmin } from '../middleware/auth';
import expressAsyncHandler from 'express-async-handler';
import {validateAddProducto} from '../validators/producto' 
const router = Router();

router.get('/', 
expressAsyncHandler(productoController.getProducto)
);

router.get('/:id',
expressAsyncHandler(productoController.getProducto)
);

router.get('/:categoria', 
expressAsyncHandler(productoController.getProducto)
);

router.post('/agregar',
checkAdmin,
validateAddProducto,
expressAsyncHandler(productoController.addProducto)
);

router.put('/actualizar/:id', 
checkAdmin,
validateAddProducto,
expressAsyncHandler(productoController.updateProducto)
);

router.delete('/borrar/:id',
checkAdmin,
expressAsyncHandler(productoController.deleteProducto)
);

export default router;