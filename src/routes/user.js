import { Router } from 'express';
import { UserController} from '../controllers/userController';
import expressAsyncHandler from 'express-async-handler';
const router = Router();

router.get('/',expressAsyncHandler(UserController.getUsers));

router.post('/agregar',
expressAsyncHandler(UserController.addUser));

router.post('/actualizar/:id',
expressAsyncHandler(UserController.updateUser));

router.delete('/borrar/:id',
expressAsyncHandler(UserController.deleteUser) );

export default router;