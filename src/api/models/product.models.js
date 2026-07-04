import connection from "../database/db.js";

const selectProductos = () => {
    const consultaSQL = "SELECT id, nombre, imagen, categoria, precio FROM productos WHERE activo = 1";
    return connection.query(consultaSQL);
}

export default {
    selectProductos
}