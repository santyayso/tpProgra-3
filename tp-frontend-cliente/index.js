
/* SACAMOS EL NOMBRE DESDE EL LOCALSTORAGE*/
let nombreGuardado = sessionStorage.getItem('nombreUsuario');

/* PREGUNTAMOS SI NOMBRE TIENE ALGO, SI TIENE HACEMOS REFERENICA AL ID PARA PONERLO EN EL NAV ASI PONEMOS EL NOMBRE*/
if (nombreGuardado) {
    document.getElementById('nombre-usuario').textContent = nombreGuardado;
}

/* SI NO HAY NOMBRE REDIRIGIMOS AL LOGIN */
else{
    window.location.href = "pages/login/login.html"; 
}

/* BUSCAMOS EL ID DE LA LISTA DE LOS CELUS/COMPUS Y LOS GUARDAMOS EN UNA VARIABLE PARA USARLO DESPUES EN EL MOSTRAR*/
let listadoCelularesHTML = document.querySelector("#listado-celulares");
let listadoComputadorasHTML = document.querySelector("#listado-computadoras");


//  contenedorProductos.innerHTML = `
//     <p class="mensaje mensaje-error">${message}</p>
// `;
//     }

//     const contenedorProductos = document.getElementById("contenedor-productos");

/* INICIAMOS LISTAS QUE DESPUES USAMOS EN OBTENER PRODUCTOS */
let celulares = [];
let computadoras = [];

/* INICIAMOS CARRITO VACIO SINO CARRITO NO ANDARIA*/
let carrito = [];

/* GUARDAMOS EN CARRITO LO QUE HAY EN EL LOCAL */
let carritoJSON = localStorage.getItem("carrito");

/* SI NO GUARDO NULL, USAMOS EL METODO PARSE DE LA CLASE JSON PARA PARSEAR DE STRING JSON A OBJETO */
if (carritoJSON != null) {
    carrito = JSON.parse(carritoJSON)
}

// ============================================
// 1. OBTENER PRODUCTOS
// ============================================

/* DECLARAMOS CON ASYCN POR QUE USAMOS AWAIT YA QUE ESTA FUNCION PUEDE TARDAR */
async function obtenerProductos() {

    /* CREAMOS VARIABLE CON LA URL Y CON EL END POINT DONDE ESTAN LOS PRODUCTOS */
    const urlBase = "http://localhost:3000/api/productos";
    
    try {

        /* USAMOS EL METODO FETCH, QUE RECIBE POR PARAMETRO UNA URL PARA TRAER LOS DATOS, ESTE PROCESO SE LLAMA PROMISE/PROMESA
        Y SE CREA UNA VARIABLE DE TIPO RESPONSE */
        const response = await fetch(urlBase);

        /* USAMOS EL METODO .JSON DE RESPONSE, AGARRA LA INFO DEL BODY Y LA TRANSFORMA A JSON */
        const data = await response.json();

        // if (!response.ok) {
        //     mostrarError(data.message);
        //     return;
        // }

        /* GUARDO EN UNA VARIABLE LOS PRODUCTOS, YA QUE EN NUESTRO BACKEND ESTA ECHO PARA QUE 
        LOS PRODUCTOS SE GUARDEN EN UNA PROPIEDAD LLAMADA "PRODUCTOS" */
        const productos = data.productos;

        /* ITERAMOS EN PRODUCTOS CON FILTER Y METEMOS A NUESTROS ARRAY SOLO LOS QUE CUMPLAN LA CONDICION */
        celulares = productos.filter((producto) => producto.activo === 1 && producto.categoria === "Celulares")
        computadoras = productos.filter((producto) => producto.activo === 1 && producto.categoria === "Computadoras")

        /* LLAMAMOS A NUESTRO MOSTRAR PRODCUTOS Y LE PASAMOS LOS PARAMETROS */
        mostrarProductos(celulares, listadoCelularesHTML, "celular");
        mostrarProductos(computadoras, listadoComputadorasHTML, "computadora");

    } catch (error) {
        console.error(error);
    }

}

// ============================================
// 2. MOSTRAR PRODUCTOS
// ============================================

/* RECIBE POR PARAMETROS, LA LISTA CON LOS PRODUCTOS, LA ID DONDE VAMOS A INYECTAR, Y TIPO PRODUCTO */
function mostrarProductos(arrayProductos, ulAInyectar, tipoProducto) {

    /* CREAMOS UN STRING VACIO PARA PONER TODO EL HTML QUE VAMOS A INYECTAR */
    let string = "";

    /* RECOREMOS EL ARRAY DE PRODUCTOS */
    arrayProductos.forEach((producto) => {

        /* Y LE AÑADIMOS POR CADA ITERACION, NOMBRE, PRECIO, DESCRIPCION, BOTON ETC */
        string += `
            <li class="li-${tipoProducto}">
                <img class="img-producto" src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h3 class="nombre-producto">${producto.nombre}</h3>
                    <p class="precio-producto">$${producto.precio}</p>
                </div>
                <div class="contenedor-boton-agregar">
                    <button class="boton-agregar" onclick="sumarAlCarrito(${producto.id})"> Agregar al carrito
                    </button>
                </div>
            </li>
        `;
    });

    /* PONEMOS DENTRO DEL ID DEL CONTENEDOR QUE GUARDAMOS ANTES, EL STRING */
    ulAInyectar.innerHTML = string;
}

// ============================================
// 3. IDENTIFICAR PRODUCTO SELECCIONADO
// ============================================

 /* A ESTA FUNCION LE PASAMOS POR PARAMETRO UN ID */
function identificarProductoSeleccionado(idProducto) {

    /* CREAMOS UNA VARIABLE Y ITERAMOS EN NUESTRO ARRAY DE CELULARES Y PREGUNTAMOS POR EL ID*/
    let productoSeleccionado = celulares.find((celular) => celular.id == idProducto);

    /* SI EL FIND NO ENCONTRO CORRELACION, EN LA VARIABLE DE ARRIBA NO SE GUARDO NADA */
    if (!productoSeleccionado) {

        /* ENTONCES BUSCAMOS EN EL ARRAY DE COMPUTADORAS, POR QUE EN ALGUN LADO EL ID TIENE QUE ESTAR */
        productoSeleccionado = computadoras.find((computadora) => computadora.id == idProducto);
    }


    return productoSeleccionado;
}

// ============================================
// 4. SUMAR AL CARRITO
// ============================================

function sumarAlCarrito(idProducto) {

    let productoSeleccionado = identificarProductoSeleccionado(idProducto);
    let indiceProductoCarrito = carrito.findIndex((productoCarrito) => productoCarrito.id == productoSeleccionado.id);

    if (indiceProductoCarrito == -1) {
        let nuevoProducto = {
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            categoria: productoSeleccionado.categoria,
            precio: productoSeleccionado.precio,
            cantidad: 1
        }
        carrito.push(nuevoProducto);
    }

    else {
        carrito[indiceProductoCarrito].cantidad += 1;

    }
    actualizarContadorCarrito(carrito);

    alert(`Un/Una ${productoSeleccionado.nombre} fue agregado al carrito`);
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

// ============================================
// 5. ACTUALIZAR CONTADOR CARRITO
// ============================================

function actualizarContadorCarrito(carrito) {

    /* USAMOS EL REDUCE PARA ITERAR EN CARRITO, GUARDANDO EN CONTADOR LA SUMA */
    let totalProductos = carrito.reduce((contador, producto) => contador + producto.cantidad, 0);

    /* GUARDAMOS EN UNA VARIABL ELA REFERENCIA AL ID PARA INYECTAR */
    let contador = document.getElementById("contador-carrito");

    /* INYECTAMOS EL TOTAL EN LA REFERENCIA CON EL ID */
    contador.textContent = totalProductos;

}

// ============================================
// 6. TEMA OSCURO
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
// 7. INICIALIZAR
// ============================================

function init() {
    obtenerProductos();
    actualizarContadorCarrito(carrito);
}

init();
