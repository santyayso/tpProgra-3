const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");
const urlBase = "http://localhost:3000/api/productos";

function mostrarMensaje(type, message) {
    contenedorProductos.innerHTML = `
        <p class="mensaje-${type}">${message}</p>
    `;
}

getProductForm.addEventListener("submit", async event => {
    event.preventDefault();

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
            mostrarMensaje("error", datos.message);
            return;
        }

        const producto = datos.producto[0];
        renderizarProducto(producto);
    }

    // VALIDACION POR SI NO SE PUDO HACER EL FETCH
    catch (error) {
        console.error("Error al obtener el producto");
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    let estado = ""
    if (producto.activo === 1) {
        estado = "Activo";
    }
    else {
        estado = "Inactivo"
    }

    let htmlProducto = `
            <ul>
                <li class="lista-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: $${producto.precio}</strong> / Estado: ${estado}</p>
                    <input type="button" id="deleteProduct-button" value="Eliminar Producto">
                </li>
            </ul>
            `;

    contenedorProductos.innerHTML = htmlProducto;

    const deleteProductButton = document.getElementById("deleteProduct-button");

    deleteProductButton.addEventListener("click", event => {
        event.stopPropagation();

        const confirmacion = confirm("¿Estas seguro de que querés eliminar este producto?");

        if (!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            eliminarProducto(producto.id);
        }
    });
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        // VALIDACION SI SE PUDO HACER EL FETCH, PERO DEVOLVIÓ UN ESTADO/CODIGO DE RESPUESTA QUE NO ESTA ENTRE 200 Y 299 (middelware ID POSITIVO u error interno)
        if (!response.ok) {
            console.error(result.message);
            mostrarMensaje("error", result.message)
            return;
        }

        mostrarMensaje("exito", result.message);

    } catch (error) {
        // VALIDACION POR SI NO SE PUDO HACER EL FETCH
        console.error("Error en la solicitud DELETE: ", error);
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
}
