import { Router } from "express";
// import { validateID, validateProduct } from "../middlewares/middlewares.js";
import { ControladorObtenerProductos } from "../controllers/product.controllers.js";
const router = Router();

router.get("/", ControladorObtenerProductos);

export default router;



