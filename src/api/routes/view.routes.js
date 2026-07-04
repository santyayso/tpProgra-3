import { Router } from "express";
import { vistaIndex} from "../controllers/view.controllers.js";
const router = Router();

router.get("/index", vistaIndex);

export default router;