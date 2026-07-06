const contenedorProductos = document.getElementById("contenedor-productos");
const postProductForm = document.getElementById("postProduct-form");
const urlBase = "http://localhost:3000/api/productos";

function mostrarMensaje(type, message) {
    contenedorProductos.innerHTML =
        `<p class="mensaje-${type}">${message}</p>`
        ;
}


function mostrarListaErrores(array) {
    let htmlErrores = "";
    array.forEach((error) => {
        htmlErrores += `<p class="mensaje-error">${error}</p>`
    });
    contenedorProductos.innerHTML = htmlErrores;
}


// VALIDACIONES POR SI SACAMOS EL REQUIRED
function validarFormulario(data) {
    const errores = [];

    // VALIDACION SI EL NOMBRE TIENE MENOS DE 2 CARACTERES
    if (!data.nombre || data.nombre.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    // VALIDACION SI EL PRECIO ES MENOR A 0
    if (!data.precio || isNaN(data.precio) || Number(data.precio) < 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // VALIDACION SI NO SE SELECCIONA UNA CATEGORIA
    if (!data.categoria) {
        errores.push("Debe seleccionar una categoria");
    }

    // VALIDACION SI NO SE PONE LA IMAGEN
    if (!data.imagen) {
        errores.push("El producto debe incluir una imagen");
    }

    return errores;
}


postProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    data.precio = Number(data.precio);
    // console.log(data);
    const errores = validarFormulario(data);

    if (errores.length > 0) {
        mostrarListaErrores(errores);
        return;
    }

    try {
        const response = await fetch(urlBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        // console.log(response);

        const result = await response.json();
        // VALIDACION SI SE PUDO HACER EL FETCH, PERO DEVOLVIÓ UN ESTADO/CODIGO DE RESPUESTA QUE NO ESTA ENTRE 200 Y 299 (error interno o middelware)
        if (!response.ok) {
            if (result.listaErrores) {
                mostrarListaErrores(result.listaErrores)
              
            }
            mostrarMensaje("error", result.message);
            return;

        }


        mostrarMensaje("exito", result.message);
    


    } catch (error) {
        // VALIDACION POR SI NO SE PUDO HACER EL FETCH
        console.error("Error al enviar los datos ", error);
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
})
