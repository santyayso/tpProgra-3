import { request, response } from "express";
import ProductModels from "../models/product.models.js";

const controladorObtenerProductos = async (request, response) => {
    try {
        const [filas, campos] = await ProductModels.selectProductos();

        if (filas.length === 0) {
            return response.status(404).json({
                message: "No se encontraron productos"
            });
        };

        response.status(200).json({
            productos: filas,
            totalProductos: filas.length
        });
    }

    catch (error) {
        // VALIDACION ERROR INTERNO (CONSULTA MAL)
        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al obtener productos"
        });
    }

}

const controladorObtenerProductoID = async (request, response) => {
    try {
        const [filas] = await ProductModels.selecProductById(request.id)

        // VALIDACION POR SI EL ID INGRESADO NO EXISTE
        if (filas.length === 0) {
            return response.status(404).json({
                message: `No se encontraron productos con ID: ${request.id}`
            });
        };

        response.status(200).json({
            producto: filas
        })

    }
    // VALIDACION ERROR INTERNO (CONSULTA MAL)
    catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al obtener un producto por ID"
        });

    }
}


const controladorCrearProducto = async (request, response) => {
    try {
        const { nombre, imagen, categoria, precio } = request.body;
        const cleanNombre = nombre.trim();
        const [filas] = await ProductModels.insertProductos(cleanNombre, imagen, categoria, precio);

        response.status(201).json({
            message: `Producto creado con exito con id ${filas.insertId}`,
        });

    }

    // VALIDACION ERROR INTERNO (CONSULTA MAL)
    catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al crear productos"
        });
    }
}



const controladorBorrarProducto = async (request, response) => {
    try {
        await ProductModels.deleteProducto(request.id);

        response.status(200).json({
            message: `Producto con id ${request.id} eliminado correctamente`

        })
    }

    // VALIDACION ERROR INTERNO (CONSULTA MAL)
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Error interno del servidor al eliminar productos"
        });
    }
    
}






const controladorModificarProducto = async (request, response) => {
    try {
        const { id, nombre, imagen, categoria, precio, activo } = request.body;

        const [result] = await ProductModels.updateProducto(nombre, imagen, categoria, precio, activo, id);

        /////
        if (result.changedRows === 0) {
            return response.status(404).json({
                message: `No se modificó ningún dato del producto`
            })
        }


            return response.status(200).json({
                message: "Producto actualizado correctamente"
            });

    }

    // VALIDACION ERROR INTERNO (CONSULTA MAL)
    catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al actualizar productos"
        });
    }

}


export {
    controladorBorrarProducto,
    controladorCrearProducto,
    controladorModificarProducto,
    controladorObtenerProductoID,
    controladorObtenerProductos
}