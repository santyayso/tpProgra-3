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
