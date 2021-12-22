import { Router } from "express";
import { UserController } from "../controllers/userController";
import expressAsyncHandler from "express-async-handler";
import { validateUser } from "../validators/user";
const router = Router();

router.get("/", expressAsyncHandler(UserController.getUsers));

router.get("/:id", expressAsyncHandler(UserController.getUsers));

router.post(
  "/agregar",
  validateUser,
  expressAsyncHandler(UserController.addUser)
);

router.put(
  "/actualizar/:id",
  validateUser,
  expressAsyncHandler(UserController.updateUser)
);

router.delete("/borrar/:id", expressAsyncHandler(UserController.deleteUser));

export default router;
