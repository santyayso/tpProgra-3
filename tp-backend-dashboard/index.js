////////////////////////////
//// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { productRoutes, viewRoutes, ventasRoutes, userRoutes,  authRoutes } from "./src/api/routes/index.js";
import {__dirname, join } from "./src/api/utils/index.js";
import session from "express-session";


////////////////////////////

////////////////////
// Config
const app = express();  // Inicializamos express
const PORT = environments.port;
const { port, session_key } = environments;
////////////////////

// Middleware CORS basico para permitir todas las solicitudes
app.use(cors());
// Middleware para parsear el JSON de las peticiones POST y PUT
app.use(express.json());
// Middleware para parsear info enviada con <forms>
app.use(express.urlencoded({ extended: true }));

console.log(environments);
// Middleware de sesion
app.use(session({
    secret: session_key, // Firmamos las cookies para evitar manipulacion (protegemos la sesion con una contraseña)
    resave: false, // Evitamos guardar la sesion si no hubo cambios
    saveUnitialized: true // No guardamos sesiones vacias
}));


// No entiendo
app.use(express.static(join(__dirname, "src/public")));



// Vistas EJS
app.set("view engine", "ejs"); // configuramos ejs como motor de vistas
app.set("views", join(__dirname, "src/views"));

app.use("/api/productos", productRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/login", authRoutes); // Rutas de autenticacion
app.use("/api/users", userRoutes) // Rutas de usuario

// Escuchador de puerto
app.listen(PORT, () => {                   
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});








app.use("/dashboard", viewRoutes);