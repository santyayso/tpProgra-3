import { request, response } from "express";
import ProductModels from "../models/product.models.js";

export const controladorObtenerProductos = async (request, response) => {
    try {
        const [filas, campos] = await ProductModels.selectProductos();

        if (filas.length === 0) {
            return response.status(404).json({
                message: "No se encontraron productos"
            });
        };

        response.status(200).json({
            productos: filas,
            total: filas.length  
        });
    }

    catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al obtener productos"
        });
    }

}

export const controladorObtenerProductoID = async (request, response) => {
    try {

        const [filas] = await ProductModels.selecProductById(request.id)

        if (filas.length === 0) {
            return response.status(404).json({
                message: `No se encontraron productos con ID: ${request.id}`
            });
        };

        response.status(200).json({
            producto: filas
        })

    }
    catch (error) {

        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al obtener un producto por ID"
        });

    }
}


export const controladorCrearProducto = async (request, response) => {
    try {

        const { nombre, imagen, categoria, precio } = request.body;

        const cleanNombre = nombre.trim(); 

        const [filas] = await ProductModels.insertProductos(cleanNombre, imagen, categoria, precio);

        response.status(201).json({
            message: `Producto creado con exito con id ${filas.insertId}`,
            productId: filas.insertId 
        });

    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al crear productos"
        });

    }
}



export const controladorBorrarProducto = async (request, response) => {
    try {

    await ProductModels.deleteProducto(request.id);

        response.status(200).json({
            message: `Producto con id ${request.id} eliminado correctamente`

        })
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Error interno del servidor al eliminar productos"
        });
    }


}






export const controladorModificarProducto = async (request, response) => {
    try {
        const { id, nombre, imagen, categoria, precio } = request.body;

        const [result] = await ProductModels.updateProducto(nombre, imagen, categoria, precio, id);


        if (result.affectedRows === 0) {
            return response.status(404).json({
                message: `No se actualizo el producto`
            })
        }


        return response.status(200).json({
            message: "Producto actualizado correctamente"
        });

    }

    catch (error) {
        console.log(error)
       
        response.status(500).json({
            message: "Error interno del servidor al actualizar productos"
        });
    }

}
