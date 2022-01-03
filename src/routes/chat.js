import { Router } from "express";
import { MensajesController } from "../controllers/mensajesController";
const router = Router();

router.get("/", MensajesController.getMensajes);

export default router;
