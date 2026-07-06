import { request, response } from "express";
import ventasModels from "../models/ventas.models.js";



const controladorInsertarVenta = async (request, response) => {
    try {
        const { nombreUsuario, fecha, precio, carrito} = request.body;

        const [filas] = await ventasModels.insertVentas(nombreUsuario, fecha, precio);

        const idVentaGenerado = filas.insertId;

        for (const producto of carrito) {
            await ventasModels.insertVentaProducto(idVentaGenerado, producto.id, producto.cantidad);
        }
        response.status(201).json({
            message: `Venta insertada con  exito`,
        });

    }


    catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al insertar la venta"
        });
    }
}



export {
    controladorInsertarVenta
}
