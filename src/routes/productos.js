import  {Router} from 'express';
import { productoController } from '../controllers/productoController';
import { checkAdmin } from '../middleware/auth';
import expressAsyncHandler from 'express-async-handler';
import {validateProducto} from '../validators/producto' 
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
validateProducto,
expressAsyncHandler(productoController.addProducto)
);

router.put('/actualizar/:id', 
checkAdmin,
validateProducto,
expressAsyncHandler(productoController.updateProducto)
);

router.delete('/borrar/:id',
checkAdmin,
expressAsyncHandler(productoController.deleteProducto)
);

export default router;