// VALIDACION PARA VALIDAR QUE EL ID SEA POSITIVO
const validarId = (request, response, next) => {
    const id = Number(request.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return response.status(400).json({
            message: "El ID ingresado debe ser un numero entero positivo"
        })
    }
    request.id = id;
    next();

}


const categoriasValidas = ["Computadoras", "Celulares"];
const validarProducto = (request, response, next) => {

    const { nombre, imagen, precio, categoria } = request.body; 
    const errores = []; 

    // VALIDACIONES POR SI SACAMOS EL REQUIRED
    if (!nombre || !imagen || !precio || !categoria) {
        errores.push("Asegúrate de incluir todos los campos");
    }

    // VALIDACION SI EL NOMBRE TIENE MENOS DE 2 CARACTERES
    if (typeof nombre !== "string" || nombre.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    // VALIDACION SI EL PRECIO ES MENOR A 0
    if (typeof precio !== "number" || precio <= 0) {
        errores.push("El precio debe ser un número mayor a 0");
    }

    if (!categoriasValidas.includes(categoria)) {
        errores.push("Categoría inválida");
    }

    if (errores.length > 0) {
        return response.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next();
};

export {validarId, validarProducto}