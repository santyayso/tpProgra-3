
import { Router } from "express";
import { loginDestroy, loginUser, vistaLogin } from "../controllers/auth.controllers.js";
const router = Router();

router.get("/", vistaLogin);


//////////////////////
// Funcionalidad login
router.post("/", loginUser);


/////////////////////////
// Funcionalidad logout
router.post("/destroy", loginDestroy);


export default router;