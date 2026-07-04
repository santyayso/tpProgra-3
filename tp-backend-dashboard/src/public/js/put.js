 function mostrarMensaje(type, message) {
            contenedorProductos.innerHTML = `
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


        const urlBase = "http://localhost:3000/api/productos";
        const contenedorProductos = document.getElementById("contenedor-productos");
        const getProductForm = document.getElementById("getProduct-form");
        const contenedorForm = document.getElementById("contenedor-form");

        getProductForm.addEventListener("submit", async event => {
            event.preventDefault(); //Evitamos el envio por defecto HTML del formulario

            // Extraemos el id del producto
            const idProd = event.target.idProd.value.trim();

            if (!idProd) {
                mostrarMensaje("error", "Ingresa un ID valido")
                return;

            }


            try {
                
                const response = await fetch(`${urlBase}/${idProd}`);
                console.log(response);

              
                const datos = await response.json();



                if (!response.ok) {
                    contenedorForm.innerHTML = "";
                    mostrarMensaje("error", datos.message);
                    return;
                }

                console.log(datos);

                const producto = datos.producto[0];

                console.log(producto);
  
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
                    <input type="button" id="deleteProduct-button" value="Actualizar Producto">
                </li>
            </ul>
            `;

            contenedorProductos.innerHTML = htmlProducto;

            // Otra opcion seria agregando el atributo onclick="nombrefuncion"

            const deleteProductButton = document.getElementById("deleteProduct-button");

            deleteProductButton.addEventListener("click", event => {
                event.stopPropagation();



                const confirmacion = confirm("Querés actualizar este producto?");

                if (!confirmacion) {
                    alert("Eliminacion cancelada");
                } else {
                    crearFormularioPut(event, producto);
                }
            });
        }


        async function crearFormularioPut(event, producto) {
            // try {
            event.stopPropagation();
            console.table(producto);

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
                        <option value="Celulares">Celulares</option>
                        <option value="Computadoras">Computadoras</option>
                    </select>

                    <label for="priceProd">Precio</label>
                    <input type="number" name="precio" id="priceProd" value="${producto.precio}" required>

                    
                    <label for="activeProd">Activo</label>
                                  <select name="activo" id="activeProd" required>
                        <option value="0">inactivo</option>
                        <option value="1">activo</option>
                    </select>


                    <div>
                        <input type="submit" value="Actualizar  producto">
                    </div>
                </form>

            `;
            contenedorForm.innerHTML = updateFormHTML;

            const updateProductForm = document.getElementById("updateProduct-form");

            updateProductForm.addEventListener("submit", event => {
                actualizarProducto(event);
            });

            // }

            // catch (error) {
            //     console.error("Error en la solicitud DELETE: ", error);
            //     alert("Ocurrio un error al eliminar un producto");
            // }
        }

        // Funcion para realizar una operacion delete
        async function actualizarProducto(event) {

            event.preventDefault(); // Evitamos el envío por defecto del formulario

            // Recogemos los datos del formulario en un objeto FormData (no podemos hacer stringify())
            const formData = new FormData(event.target);

            // Parseamos este objeto FormData a un objeto JS para poder enviarlo como JSON.stringify() en el cuerpo de la petición
            const data = Object.fromEntries(formData.entries());

            data.precio = Number(data.precio);


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


                // Optimizacion : Manejamos una respuesta no ok del
                // if (!response.ok) {

                //     // console.log(`Lista de errores: \n ${result.listaErrores.length}`);
                //     contenedorForm.innerHTML = "";
                //     // TO DO: Crear mostrarListaErrores
                //     if (result.listaErrores) {
                //         mostrarListaErrores(result.listaErrores);
                //     }
                //     mostrarMensaje("error", result.message);
                //     console.log(result);
                //     result.listaErrores.forEach(error => {
                //         console.log(error);
                //     })
                //     console.log(result.listaErrores)
                //     return;

                // }



                 if (!response.ok) {

                                mostrarMensaje("error", result.message);
                                return;
                            }



                getProductForm.innerHTML = "";
                contenedorForm.innerHTML = "";

                mostrarMensaje("exito", result.message);
                console.log(result.message);


            } catch (error) {
                console.error(error);
            }




        }
