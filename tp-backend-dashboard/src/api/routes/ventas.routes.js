import { Router } from "express";
import { controladorInsertarVenta } from "../controllers/ventas.controllers.js";
const router = Router();

router.post("/", controladorInsertarVenta);

export default router;