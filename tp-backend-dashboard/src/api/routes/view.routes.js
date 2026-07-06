import { Router } from "express";
import { vistaIndex, vistaGet, vistaPost, vistaBorrar, vistaModificar} from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();

router.get("/index", requireLogin,  vistaIndex);
router.get("/consultar", requireLogin, vistaGet);
router.get("/crear", requireLogin, vistaPost);
router.get("/eliminar", requireLogin, vistaBorrar);
router.get("/modificar", requireLogin, vistaModificar);

export default router;