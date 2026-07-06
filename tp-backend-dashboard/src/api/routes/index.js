// / Archivo barril:centraliza todas las rutas y las exporta con un nombre

import productRoutes from "./product.routes.js"
import viewRoutes from "./view.routes.js"
import ventasRoutes from  "./ventas.routes.js"
import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";


export{
    productRoutes,
    viewRoutes,
    ventasRoutes,
    authRoutes,
    userRoutes
}