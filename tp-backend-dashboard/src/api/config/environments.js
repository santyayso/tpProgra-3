// IMPORTAMOS DOTENV PARA PODER LEER LOS DATOS DEL .ENV
import dotenv from "dotenv";

// Esta línea es la que lee ese archivo .env y mete cada línea dentro de process.env:
dotenv.config(); 

export default {
    port: process.env.PORT || 3100,
    session_key: process.env.SESSION_KEY,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
}