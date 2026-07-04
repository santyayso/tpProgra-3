import connection from "../database/db.js";

const selectProductos = () => {
    const consultaSQL = "SELECT id, nombre, imagen, categoria, precio FROM productos WHERE activo = 1";
    return connection.query(consultaSQL);
}

const selecProductById = (id) => {
    const consultaSQL = "SELECT id, nombre, imagen, categoria, precio FROM productos WHERE productos.id = ?";

    return connection.query(consultaSQL, [id]);
}

const insertProductos = (cleanNombre, imagen, categoria, precio) => {
        const sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";

        return connection.query(sql, [cleanNombre, imagen, categoria, precio]);
}

export default {
    selectProductos,
    selecProductById,
    insertProductos
}

