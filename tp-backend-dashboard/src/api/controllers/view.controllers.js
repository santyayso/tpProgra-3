import { request, response } from "express";
import ProductModels from "../models/product.models.js"

const vistaIndex = async (request, response) => {
    try {
        const [filas] = await ProductModels.selectProductos();
        const productosActivos = filas.filter((producto) => Number(producto.activo) === 1)
        const productosInactivos = filas.filter((producto) => Number(producto.activo) === 0)

        response.render("index", {
            title: "Principal",
            productosActivos,
            productosInactivos
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).send("No se pudo cargar la vista");
    }
}

const vistaGet = async (request, response) => {
    try {
        response.render("get", {
            title: "Consultar",
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).send("No se pudo cargar la vista");
    }

}


const vistaPost = async (request, response) => {
    try {
        response.render("post", {
            title: "Crear"
        })

    }
    catch (error) {
        console.error(error);
        response.status(500).send("No se pudo cargar la vista");
    }

}

const vistaBorrar = async (request, response) => {
    try {
        response.render("delete", {
            title: "Eliminar",
        })
    }
    catch (error) {
        console.error(error);
        response.status(500).send("No se pudo cargar la vista");
    }

}


const vistaModificar = async (request, response) => {
    try {
        response.render("put", {
            title: "Modificar",

        })
    }
    catch (error) {
        console.error(error);
        response.status(500).send("No se pudo cargar la vista");
    }

}

export {
    vistaBorrar,
    vistaGet,
    vistaIndex,
    vistaModificar,
    vistaPost
}