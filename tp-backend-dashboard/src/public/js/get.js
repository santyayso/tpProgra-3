
        function mostrarError(message) {
            contenedorProductos.innerHTML = `
        <p class="mensaje-error">${message}</p>
    `;
        }

        const contenedorProductos = document.getElementById("contenedor-productos");
        const getProductForm = document.getElementById("getProduct-formulario");
        const urlBase = "http://localhost:3000/api/productos";

        getProductForm.addEventListener("submit", async event => {
            event.preventDefault(); 

            console.log(event.target); 
            
            const idProd = event.target.idProd.value.trim();

            if (!idProd){
                mostrarError("Ingresa un ID valido")
                return;

            }

            try {
                const response = await fetch(`${urlBase}/${idProd}`);

                const data = await response.json();

                if (!response.ok){
                    mostrarError(data.message);
                    return;
                }

                const producto = data.producto[0];

                mostrarProducto(producto);
            }
            catch (error) {
                console.error("Error al obtener el producto: ", error);

                mostrarError("Error de conexion con el servidor");
            }

        });

        function mostrarProducto(producto) {
            console.table(producto); 
            let htmlProducto = `
                <ul>
                    <li class="lista-producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: $${producto.precio}</strong></p>
                    </li>
                </ul>
            `;

            contenedorProductos.innerHTML = htmlProducto;
        }