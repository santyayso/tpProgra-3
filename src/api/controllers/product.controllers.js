import { request, response } from "express";
import ProductModels from "../models/product.models.js";

export const ControladorObtenerProductos = async (request, response) => {
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
        response.status(500).json({
            message: "Error interno del servidor al obtener productos"
        });
    }

}

export const ControladorObtenerProductoID = async (request, response) => {
    try {

        const [rows] = await ProductModels.selecProductById(request.id)

        if (rows.length === 0) {
            return response.status(404).json({
                message: `No se encontraron productos con ID: ${request.id}`
            });
        };

        response.status(200).json({
            payload: rows
        })

    }
    catch (error) {

        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al obtener un producto por ID"
        });

    }
}

export const ControladorCrearProducto = async (request, response) => {
    try {

        const { nombre, imagen, categoria, precio } = request.body;

        const cleanNombre = nombre.trim(); 

        const [rows] = await ProductModels.insertProductos(cleanNombre, imagen, categoria, precio);

        response.status(201).json({
            message: `Producto creado con exito con id ${rows.insertId}`,
            productId: rows.insertId 
        });

    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Error interno del servidor al crear productos"
        });

    }
}



