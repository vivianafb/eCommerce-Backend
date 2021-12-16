import  {Router} from 'express';
import { ordersController } from '../controllers/ordenesController';
import { checkAdmin } from '../middleware/auth';
import expressAsyncHandler from 'express-async-handler';
const router = Router();

router.get('/',
checkAdmin, 
expressAsyncHandler(ordersController.getOrders));

router.get('/:orderId',
expressAsyncHandler(ordersController.getOrdersById));

router.post('/complete',
checkAdmin, 
expressAsyncHandler(ordersController.submit));


export default router;