import { Router } from "express";
import { ControladorObtenerProductos, ControladorObtenerProductoID, ControladorCrearProducto} from "../controllers/product.controllers.js";
import { validarId, validarProducto} from "../middlewares/middlewares.js";
const router = Router();

router.get("/", ControladorObtenerProductos);
router.get("/:id",validarId, ControladorObtenerProductoID )
router.post("/", validarProducto, ControladorCrearProducto);

export default router;

