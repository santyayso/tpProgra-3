import { Router } from "express";
import { controladorObtenerProductos, controladorObtenerProductoID, controladorCrearProducto, controladorBorrarProducto, controladorModificarProducto} from "../controllers/product.controllers.js";
import { validarId, validarProducto} from "../middlewares/middlewares.js";
const router = Router();

router.get("/", controladorObtenerProductos);
router.get("/:id",validarId, controladorObtenerProductoID )
router.post("/", validarProducto, controladorCrearProducto);
router.delete("/:id", validarId, controladorBorrarProducto)
router.put("/", validarProducto, controladorModificarProducto);

export default router;

