
/* SACAMOS EL NOMBRE DEL USUARIO DEL SESSIONSTORAGE*/
let nombreGuardado = sessionStorage.getItem('nombreUsuario');

/* PREGUNTAMOS SI NOMBRE TIENE ALGO, SI TIENE HACEMOS REFERENICA AL ID ASI PONEMOS EL NOMBRE*/
if (nombreGuardado) {
    document.getElementById('nombre-usuario').textContent = nombreGuardado;
}
else {
    window.location.href = "../login/login.html";
}

// ============================================
// 1. OBTENER CARRITO
// ============================================
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// ============================================
// 2. CARGAR PRODUCTOS CARRITO
// ============================================
function cargarProductosCarrito() {

    /* OBTENEMOS CARRITO */
    let carrito = obtenerCarrito();

    /* HACEMOS REFERENCIA AL ID PARA LUEGO PRINTEARLO */
    let tabla = document.getElementById("tabla-carrito");

    /* CREAMOS STRIGN VACIO PARA LUEGO IR SUMANDO */
    let string = "";

    /* DELCARAMOS ESTO QUE SIEMPRE VA A ESTAR */
    string = `
                <tr class="fila-header-carrito">
                    <td class="celda-header-tabla-carrito">Nombre del producto</td>
                    <td class="celda-header-tabla-carrito">Cantidad</td>
                    <td class="celda-header-tabla-carrito">Precio unitario</td>
                    <td class="celda-header-tabla-carrito">Acciones</td>
                </tr>`

    /* ITREAMOS EN CARRITO Y LE VAMOS SUMANDO LOS PRODUCTOS Y BOTONES ETC */
    carrito.forEach((producto) => {
        string += `
                <tr class="fila-header-carrito">
                    <td class="celda-header-tabla-carrito">${producto.nombre}</td>
                    <td class="celda-header-tabla-carrito">${producto.cantidad}</td>
                    <td class="celda-header-tabla-carrito">${producto.precio}</td>
                    <td class="celda-header-tabla-carrito"> 
                    <button class="btn-sumar-a-carrito" onclick="sumarAlCarrito(${producto.id})"> + </button>
                    <button class="btn-restar-a-carrito" onclick="restarDelCarrito(${producto.id})"> - </button>

                    </td>
                </tr>`
    })

    /* INYECTAMOS EN LA REFERENCIA */
    tabla.innerHTML = string;

    /* CALCULAMOS EL PRECIO TOTAL */
    let precioFinal = carrito.reduce((precioTotal, producto) => precioTotal + (producto.precio * producto.cantidad), 0);

    /* VARIABLE CON LA REFERENCIA AL ID */
    let precioFinalHTML = document.getElementById("valor-final");

    /* PREGUNTAMOS SI PRECIO FINAL TIENE ALGO ANTES DE INYECTAR POR QUE EL CARRITO PUEDE ESTAR VACIO */
    if (precioFinalHTML) {
        precioFinalHTML.textContent = `El valor final a pagar es de: $${precioFinal}`;
    }
}

// ============================================
// 3. LIMPIAR CARRITO
// ============================================
function limpiarCarrito() {

    /* PREGUNTAMOS, SI LO QUE DEVOLVIO OBTENER CARRITO ES DE LARGO DISTINTO A 0 */
    if (obtenerCarrito().length != 0) {

        /* USAMOS EL METODO CONFIRM DE LA CLASE WINDOW */
        if (window.confirm("¿Esta seguro que desea limpiar el carrito?")) {

            /* REMOVEMOS TODO */
            localStorage.removeItem("carrito");
            cargarProductosCarrito()
        }
    }

    /* SI ENTRA ACA ES POR QUE NO HAY NADA */
    else{
        window.alert("El carrito ya se encuentra vacio")
    }
}

// ============================================
// 4. SUMAR AL CARRITO
// ============================================

/* RECIBE POR PARAMETRO UN ID PRODUCTO */
function sumarAlCarrito(idProducto) {

    /* OBTENEMOS CARRITO */
    let carrito = obtenerCarrito();
    
    /* ITERAMOS EN LA LISTA CON FINDINDEX QUE DEVUELVE EL INDICE DE DONDE SE CUMPLE LA CONDICION */
    let indiceProductoCarrito = carrito.findIndex((productoCarrito) => productoCarrito.id == idProducto);

    /* Y ACA EN CARRITO EN EL INDICE QUE ENCONTRAMOS, ACCEDEMOS A .CANTIDAD Y LE SUMAMOS 1 */
    carrito[indiceProductoCarrito].cantidad += 1;

    /* GUARDAMOS EL CAMBIO EN EL LOCAL STORAGE */
    localStorage.setItem("carrito", JSON.stringify(carrito));

    /* MOSTRAMOS LOS PRODUCTOS CAMBIADOS */
    cargarProductosCarrito();
}

// ============================================
// 5. RESTAR DEL CARRITO
// ============================================

/* RECIBE POR PARAMETRO UN ID PRODUCTO */
function restarDelCarrito(idProducto) {

    /* OBTENEMOS CARRITO */
    let carrito = obtenerCarrito();

    /* ITERAMOS EN LA LISTA CON FINDINDEX QUE DEVUELVE EL INDICE DE DONDE SE CUMPLE LA CONDICION */
    let indiceProductoCarrito = carrito.findIndex((productoCarrito) => productoCarrito.id == idProducto);

    /* Y ACA EN CARRITO EN EL INDICE QUE ENCONTRAMOS, ACCEDEMOS A .CANTIDAD Y LE RESTAMOS 1 */
    carrito[indiceProductoCarrito].cantidad -= 1;

    /* SI UNA VEZ RESTADO LLEGA A 0, PREGUNTAMOS SI LO QUEREMOS BORRAR DEL CARRITO */
    if (carrito[indiceProductoCarrito].cantidad == 0) {
        let confirmacion = confirm("¿Esta seguro que desea eliminar este producto del carrito?");

        /* SI ES TRUE, LO BORRAMOS DE CARRITO CON UN SPLICE */
        if (confirmacion == true) {
            carrito.splice(indiceProductoCarrito, 1);
        }

        /* SINO LO SETEAMOS DE VUELTA A 1 */
        else {
            carrito[indiceProductoCarrito].cantidad = 1;
        }

    }

    /* GUARDAMOS EL CAMBIO EN EL LOCAL STORAGE */
    localStorage.setItem("carrito", JSON.stringify(carrito));

    /* MOSTRAMOS LOS PRODUCTOS CAMBIADOS */
    cargarProductosCarrito();
}

// ============================================
// 6. CONFIRMAR COMPRA
// ============================================

// function confirmarCompra() {

//     /* OBTENEMOS CARRITO */
//     let carrito = obtenerCarrito();

//     /* PREGUNTAMOS EL TAMAÑO, SI ESTA VACIO TIRAMOS UN ALERT */
//     if (carrito.length === 0) {
//         alert("Tu carrito está vacío");
//         return;
//     }

//     /* USAMOS EL METODO CONFIRM DE LA CLASE WINDOW QUE CREA 2 OPCIONES, UNA ES TRUE LA OTRA FALSE */
//     if (window.confirm("¿Estas seguro  de que quiere confirmar la compra?")) {
//         window.location.href = "../ticket/ticket.html";
//     }
// }

async function confirmarCompra() {
    let carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    if (window.confirm("¿Estas seguro  de que quiere confirmar la compra?")) {

        let precioFinal = carrito.reduce((precioTotal, producto) => precioTotal + (producto.precio * producto.cantidad), 0);

        const venta = {
            nombreUsuario: nombreGuardado,
            fecha: new Date().toLocaleDateString("en-CA"),
            precio: precioFinal,
            carrito: carrito
        };


        try {

            const response = await fetch("http://localhost:3000/api/ventas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(venta)
            });

            const result = await response.json();


            // VALIDACION SI SE PUDO HACER EL FETCH, PERO DEVOLVIÓ UN ESTADO/CODIGO DE RESPUESTA QUE NO ESTA ENTRE 200 Y 299 
            if (!response.ok) {
                console.error(result.message)
                return;
            }
            window.location.href = "../ticket/ticket.html";

        }

        catch (error) {
            // VALIDACION POR SI NO SE PUDO HACER EL FETCH
            alert("Error al enviar los datos")
            console.error("Error al enviar los datos ", error);

        }
    }


}
// ============================================
// 7. TEMA OSCURO
// ============================================

/* PRIMERO NOS FIJAMOS LA ID BTN-TEMA, Y LE AGREGAMOS UN VENTO, QUE CUADO HAGA CLICK SE EJECUTE ESTA FUNCION */
document.getElementById("btn-tema").addEventListener("click", function () {

    /* ACA CON document.body AGARRAMOS EL BODY DE LA PAGINA Y CON .classList ES DICIENDO "AGARRA LA CLASE DEL BODY" Y PREGUNTAMOS SI CONTIENE OSCURO*/
    if (document.body.classList.contains("oscuro")) {
        document.body.classList.remove("oscuro");
        document.body.classList.add("claro");

        /* SI ENTREA ACA ES POR QUE YA ESTA EN CLARO */
    } else {
        document.body.classList.remove("claro");
        document.body.classList.add("oscuro");
    }
});

// ============================================
// 8. INICIALIZAR
// ============================================

function init() {
    cargarProductosCarrito();
}

init();
