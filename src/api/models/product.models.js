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
        const consultaSQL = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";

        return connection.query(consultaSQL, [cleanNombre, imagen, categoria, precio]);
}


const deleteProducto = (id) => {
      const consultaSQL = "DELETE FROM productos WHERE id = ?";

       return connection.query(consultaSQL, [id]);
}

const updateProducto = (nombre, imagen, categoria, precio, id) => {
        const consultaSQL = `UPDATE productos SET nombre = ?, imagen = ?, categoria = ?, precio = ? WHERE id = ?`;
        return connection.query(consultaSQL, [nombre, imagen, categoria, precio, id]);

}

export default {
    selectProductos,
    selecProductById,
    insertProductos,
    deleteProducto,
    updateProducto
}

