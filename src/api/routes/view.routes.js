import { Router } from "express";
import { vistaIndex, vistaGet, vistaPost} from "../controllers/view.controllers.js";
const router = Router();

router.get("/index", vistaIndex);
router.get("/consultar", vistaGet);
router.get("/crear", vistaPost)

export default router;