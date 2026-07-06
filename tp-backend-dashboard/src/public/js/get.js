const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-formulario");
const urlBase = "http://localhost:3000/api/productos";

function mostrarError(message) {
    contenedorProductos.innerHTML = `
        <p class="mensaje-error">${message}</p>
    `;
}

getProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();

    /// VALIDACION POR SI EL CAMPO ESTA VACIO (SACANDO EL REQUIRED)
    if (!idProd) {
        mostrarError("Por favor, complete el campo e ingrese un ID valido")
        return;
    }

    try {
        const response = await fetch(`${urlBase}/${idProd}`);
        const data = await response.json();

        // VALIDACION SI SE PUDO HACER EL FETCH, PERO DEVOLVIÓ UN ESTADO/CODIGO DE RESPUESTA QUE NO ESTA ENTRE 200 Y 299 (middelware ID POSITIVO, producto no existente u error INTERNO)
        if (!response.ok) {
            mostrarError(data.message);
            return;
        }

        const producto = data.producto[0];
        mostrarProducto(producto);

    }
    // VALIDACION POR SI NO SE PUDO HACER EL FETCH
    catch (error) {
        console.error("Error al obtener el producto: ", error);
        mostrarError("Error de conexion con el servidor");
    }

});

function mostrarProducto(producto) {
    let estado = ""
    if (producto.activo === 1){
        estado = "Activo";
    }
    else {
        estado = "Inactivo"
    }
    // console.table(producto);
    let htmlProducto = `
                <ul>
                    <li class="lista-producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: $${producto.precio}</strong> / Estado: ${estado} </p>
                    </li>
                </ul>
            `;

    contenedorProductos.innerHTML = htmlProducto;
}