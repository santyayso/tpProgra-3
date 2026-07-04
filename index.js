////////////////////////////
//// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import {__dirname, join } from "./src/api/utils/index.js";
////////////////////////////

////////////////////
// Config
const app = express();  // Inicializamos express
const PORT = environments.port;
////////////////////

// Middleware CORS basico para permitir todas las solicitudes
app.use(cors());
// Middleware para parsear el JSON de las peticiones POST y PUT
app.use(express.json());

// No entiendo
app.use(express.static(join(__dirname, "src/public")));

// Vistas EJS
app.set("view engine", "ejs"); // configuramos ejs como motor de vistas
app.set("views", join(__dirname, "src/views"));

app.use("/dashboard", viewRoutes);
app.use("/api/productos", productRoutes);

// Escuchador de puerto
app.listen(PORT, () => {                   
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

