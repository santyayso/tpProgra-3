import { Router } from "express";
import { vistaIndex, vistaGet, vistaPost, vistaBorrar, vistaModificar} from "../controllers/view.controllers.js";
const router = Router();

router.get("/index", vistaIndex);
router.get("/consultar", vistaGet);
router.get("/crear", vistaPost);
router.get("/eliminar", vistaBorrar);
router.get("/modificar", vistaModificar);

export default router;