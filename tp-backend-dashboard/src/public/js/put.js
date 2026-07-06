const urlBase = "http://localhost:3000/api/productos";
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");
const contenedorForm = document.getElementById("contenedor-form");

function mostrarMensaje(type, message) {
    contenedorForm.innerHTML = `
        <p class="mensaje-${type}">${message}</p>
    `;
}

function mostrarListaErrores(array) {
    let htmlErrores = "";
    array.forEach(error => {
        htmlErrores += `<p class="mensaje-error">${error}</p>`
    });
    contenedorForm.innerHTML = htmlErrores;
}



getProductForm.addEventListener("submit", async event => {
    event.preventDefault(); //Evitamos el envio por defecto HTML del formulario

    // Extraemos el id del producto
    const idProd = event.target.idProd.value.trim();

    /// VALIDACION POR SI EL CAMPO ESTA VACIO (SACANDO EL REQUIRED)
    if (!idProd) {
        mostrarMensaje("error", "Por favor, complete el campo e ingrese un ID valido")
        return;
    }

    try {
        const response = await fetch(`${urlBase}/${idProd}`);
        const datos = await response.json();

        // VALIDACION SI SE PUDO HACER EL FETCH, PERO DEVOLVIÓ UN ESTADO/CODIGO DE RESPUESTA QUE NO ESTA ENTRE 200 Y 299 (middelware ID POSITIVO, producto no existente u error INTERNO)
        if (!response.ok) {
            contenedorForm.innerHTML = "";
            mostrarMensaje("error", datos.message);
            return;
        }



        const producto = datos.producto[0];
        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener el producto");
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    let htmlProducto = `
            <ul>
                <li class="lista-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: $${producto.precio}</strong></p>
                    <input type="button" id="updateProduct-button" value="Modificar Producto">
                </li>
            </ul>
            `;

    contenedorProductos.innerHTML = htmlProducto;



    const updateProductButton = document.getElementById("updateProduct-button");

    updateProductButton.addEventListener("click", event => {
        event.stopPropagation();
        crearFormularioPut(event, producto);

    });
}


async function crearFormularioPut(event, producto) {
    event.stopPropagation();
    // console.table(producto);

 
    let selectedInactivo = "";
    let selectedActivo = "";

    if (Number(producto.activo) === 1) {
        selectedActivo = "selected";
    } else {
        selectedInactivo = "selected";
    }

    let selectedCelulares = "";
    let selectedComputadoras = "";

    if (producto.categoria === "Celulares") {
        selectedCelulares = "selected";
    } else if (producto.categoria === "Computadoras") {
        selectedComputadoras = "selected";
    }

    let updateFormHTML = `
                <hr>
                <form id="updateProduct-form" class="form-alta">
                    <input type="hidden" name="id" value="${producto.id}">

                    <label for="nameProd">Nombre</label>
                    <input type="text" name="nombre" id="nameProd" value="${producto.nombre}" required>

                    <label for="imageProd">Imagen</label>
                    <input type="text" name="imagen" id="imageProd" value="${producto.imagen}" required>

                    <label for="categoryProd">Categoría</label>
                    <select name="categoria" id="categoryProd" required>
                        <option value="Celulares" ${selectedCelulares}>Celulares</option>
                        <option value="Computadoras" ${selectedComputadoras}>Computadoras</option>
                    </select>

                    <label for="priceProd">Precio</label>
                    <input type="number" name="precio" id="priceProd" value="${producto.precio}" required>

                    
                    <label for="activeProd">Activo</label>
                        <select name="activo" id="activeProd" required>
                        <option value="0" ${selectedInactivo}>Inactivo</option>
                        <option value="1" ${selectedActivo}>Activo</option>
                    </select>

                    <div>
                        <input type="submit" value="Guardar cambios">
                    </div>
                </form>

            `;
    contenedorForm.innerHTML = updateFormHTML;

    const updateProductForm = document.getElementById("updateProduct-form");

    updateProductForm.addEventListener("submit", event => {
        actualizarProducto(event);
    });

}

async function actualizarProducto(event) {

    event.preventDefault(); // Evitamos el envío por defecto del formulario

    // Recogemos los datos del formulario en un objeto FormData (no podemos hacer stringify())
    const formData = new FormData(event.target);

    // Parseamos este objeto FormData a un objeto JS para poder enviarlo como JSON.stringify() en el cuerpo de la petición
    const data = Object.fromEntries(formData.entries());

    data.precio = Number(data.precio);
    data.activo = Number(data.activo);

    try {
        const response = await fetch(urlBase, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });


        console.log(response);

        const result = await response.json();
        console.log(result);


        // CAPUTRAMOS ERRORES DEL CONTROLADOR
        if (!response.ok) {
            if (result.listaErrores) {
                mostrarListaErrores(result.listaErrores)

            }
            mostrarMensaje("error", result.message);
            return;
        }



        getProductForm.innerHTML = "";
        contenedorForm.innerHTML = "";

        mostrarMensaje("exito", result.message);


    } catch (error) {
        // VALIDACION POR SI NO SE PUDO HACER EL FETCH
        console.error("Error al actualizar producto: ", error);
        mostrarMensaje("error", "Error de conexion con el servidor");
    }




}
