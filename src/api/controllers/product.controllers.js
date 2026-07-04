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



