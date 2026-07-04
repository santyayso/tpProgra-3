
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



                if (!idProd) {
                    mostrarMensaje("error", "Ingresa un ID valido")  
                    return;

                }

                try {
                    
                    const response = await fetch(`${urlBase}/${idProd}`);
                    const datos = await response.json();
                  



                    
                if (!response.ok){
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
                    <input type="button" id="deleteProduct-button" value="Eliminar Producto">
                </li>
            </ul>
            `;

                contenedorProductos.innerHTML = htmlProducto;

                

                const deleteProductButton = document.getElementById("deleteProduct-button");

                deleteProductButton.addEventListener("click", event => {
                    event.stopPropagation();

                    const confirmacion = confirm("Querés eliminar este producto?");

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


                    if (!response.ok){
                        console.error(result.message);
                        mostrarMensaje("error", result.message)
                        return;

                    }

                    mostrarMensaje("exito", result.message);

                    alert(result.message);
                    

                   

                } catch (error) {
                    console.error("Error en la solicitud DELETE: ", error);
                    alert("Ocurrio un error al eliminar un producto");
                }
            }
