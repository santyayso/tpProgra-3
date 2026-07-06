
import connection from "../database/db.js";


const selectUsuariosAdmins = (email) => {
        
    const sql = "SELECT * FROM usuarios where email = ? ";

    return connection.query(sql, [email]);
}


const insertUsuarioAdmin = (nombre, email, contraseña) => {

    const sql = "INSERT into usuarios (nombre, email, contraseña) VALUES (?, ?, ?)";

    return connection.query(sql, [nombre, email, contraseña]);
}


export default {
   selectUsuariosAdmins,
   insertUsuarioAdmin
}