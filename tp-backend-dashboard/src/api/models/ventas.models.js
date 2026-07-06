import connection from "../database/db.js";

const insertVentas = (nombreUsuario, fecha, precio) => {
    const consultaSQL = "INSERT INTO ventas (nombre_usuario, fecha, precio_total) VALUES (?, ?, ?)";
    return connection.query(consultaSQL, [nombreUsuario, fecha, precio]);

}


const insertVentaProducto = (idVenta, idProducto, cantidad) => {
    const consultaSQL = "INSERT INTO ventas_productos (id_venta, id_producto, cantidad) VALUES (?, ?, ?)";
    return connection.query(consultaSQL, [idVenta, idProducto, cantidad]);
};


export default {
 insertVentas,
 insertVentaProducto
}


