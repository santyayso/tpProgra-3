import { Router } from "express";
import { controladorCrearUsuarioAdmin } from "../controllers/users.controllers.js";
const router = Router();

// POST user
router.post("/", controladorCrearUsuarioAdmin);


export default router;