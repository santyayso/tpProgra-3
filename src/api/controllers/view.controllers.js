import { request, response } from "express";
import ProductModels from "../models/product.models.js"

export const vistaIndex = async (request, response) => {
    try {
        const [filas] = await ProductModels.selectProductos();

        response.render("index", {
            title: "Principal",
            arrayProductos: filas,
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).send("No se pudo cargar la vista");
    }
}

export const vistaGet = async (request, response) => {
    response.render("get", {
        title: "Consultar",
    })

}

export const vistaPost = async (request, response) => {
    response.render("post", {
        title: "Crear"
    })
}

export const vistaBorrar = async (request, response) => {
        response.render("delete", {
        title: "Eliminar",
    })

}


export const vistaModificar = async (request, response) => {
    response.render("put", {
        title: "Modificar",
    
    })
}
