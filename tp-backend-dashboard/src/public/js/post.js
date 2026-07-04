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
    array.forEach(error => {
        htmlErrores+= `<p class="mensaje-error">${error}</p>`
    });
    contenedorProductos.innerHTML = htmlErrores;
}



        function validarFormulario(data) {
            const errores = [];

            if (!data.nombre || data.nombre.trim().length < 2) {
                errores.push("El nombre debe tener al menos 2 caracteres");
            }

            if (!data.precio || isNaN(data.precio) || Number(data.precio) < 0) {
                errores.push("El precio debe ser un numero mayor a 0");
            }

            if (!data.categoria) {
                errores.push("Debe seleccionar una categoria");
            }

            return errores;
        }

        postProductForm.addEventListener("submit", async event => {
            event.preventDefault();

            const formData = new FormData(event.target);

            const data = Object.fromEntries(formData.entries());


            data.precio = Number(data.precio);

            console.log(data);


            const errores = validarFormulario(data);


            if (errores.length > 0) {
                console.log(errores);
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

                console.log(response); 

                const result = await response.json();

                if (!response.ok) {

                    if (result.listaErrores) {
                        mostrarListaErrores(result.listaErrores)
                        return;
                    } 

                    mostrarMensaje("error", result.message || "Error al crear el producto");
    return;
                    return;

                }

                mostrarMensaje("exito", result.message);
                console.log(result.message);

            } catch (error) {
                console.error("Error al enviar los datos ", error);
                mostrarMensaje("error", result.message || "Error desconocido");
            }
        })
