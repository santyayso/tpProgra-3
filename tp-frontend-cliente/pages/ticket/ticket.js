
/* PREGUNTAMOS EN EL SESSIONSTORAGE SI HAY YA UN NOMBRE GUARDADO Y LO GUARDAMOS */
let nombreGuardado = sessionStorage.getItem('nombreUsuario');

/* PREGUNTAMOS SI NOMBRE TIENE ALGO, SI TIENE HACEMOS REFERENICA AL ID ASI PONEMOS EL NOMBRE*/
if (nombreGuardado) {
    document.getElementById('nombre-usuario').textContent = nombreGuardado;
} else {
    window.location.href = "../login/login.html";
}

// ============================================
// 2. OBTENER CARRITO
// ============================================

function obtenerCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito;
}

// ============================================
// 3. CARGAR TICKET
// ============================================

/* FUNCION PARA MOSTRAR DATOS DEL TICKET */
function cargarTicket() {

    /* GUARDAMOS CARRITO EN UNA VARIABLE */
    let carrito = obtenerCarrito();

    /* GUARDAMOS EN UNA REFERENCIA EL CONTENEDOR PARA DESPUES INYECTARLO */
    let contenedor = document.getElementById("ticket-contenido");

    /* ACA GUARDAMOS EL TOTAL, USAMOS REDUCE, ITERAMOS EN EL CARRITO, Y A ACUMULADOR LE VAMOS SUMANDO 
    EL PRECIO DEL ITEM EN ESA ITERACION MULTIPLICADO POR LA CANTIDAD DE ESE ITEM EN ESA ITERACION
     */
    let total = carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);
    
    /* VARIABLE STRING CON EL NOMBRE DEL USUARIO Y LA FECHA*/
    let ticketHTML = `
        <div class="ticket">
            <p class="ticket-cliente"><strong>Cliente:</strong> ${nombreGuardado}</p>
            <p class="ticket-fecha"><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
            <p class="ticket-empresa"><strong>Empresa:</strong> TechStore </p>
            <hr class="ticket-linea">
    `;
    
    /* ITERAMOS EN CARRITO, POR CADA ITEM DECIMOS QUE A LA VARIABLE QUE CREAMOS ANTES, LE SUME UN STRING CON LOS DATOS DEL ITEM EN ESA ITERACION */
    carrito.forEach(item => {
        ticketHTML += `
            <p class="ticket-item">• ${item.cantidad}x ${item.nombre} - $${item.precio * item.cantidad}</p>
        `;
    });
    
    /* SUMAMOS MAS STRINGS A LA VARIABLE CON EL TOTAL Y UN GRACIAS */
    ticketHTML += `
            </div>
            <hr class="ticket-linea">
            <h3 class="ticket-total">Total: $${total}</h3>
            <p class="ticket-gracias"> ¡Gracias por tu compra!</p>
        </div>
    `;
    
     /* INYECTAMOS TODO EN LA VARIABLE EN LA QUE ANTES GUARDAMOS LA REFERENCIA */
    contenedor.innerHTML = ticketHTML;
}

// ============================================
// 4. IMPRIMIR TICKET EN PDF
// ============================================

function imprimirTicket() {
    /* OBTENEMOS EL CARRITO Y LO GUARDAMOS */
    let carrito = obtenerCarrito();
    
    /* ANTERIORMENTE AGREAMOS LA LIBRERIA JSPDF EN EL HTML, AHORA TENEMOS EL 
    OBJETO WINDOWS CON LOS METODOS PARA CREAR PDF */

    /* HACEMOS UN DESTRUCTURING ASI PODEMOS USAR JSPDF */
    const { jsPDF } = window.jspdf;

    /* UNA VEZ DESTRUCTURADO CREAMOS UNA VARIABLE DOC, QUE TIENE LOS METODOS DE JSPF */
    const doc = new jsPDF();
    
    //DEFINIMOS EN UNA VARIABLE EL MARGEN EN Y
    let y = 50;
    
    /* SETEAMOS EL TAMAÑO DE FUENTE PARA EL TITULO, DESPUES LO CAMBIAMOS */
    doc.setFontSize(30);

    /* ESTE METODO RECIBE POR PARAMETRO LO QUE QUEREMOS PONER, Y DEPUES LAS CORDENADAS, EJE X, EJE Y */
    doc.text("Ticket de Compra", 50, y);

    /* SUMAMOS ASI EL EJE VERTICAL ESTA MAS ABAJO AHORA DONDE ARRANCA*/
    y += 30;  
    
    /* SETEAMOS UN TAMAÑO MAS CHICO PARA EL CLIENTE Y FECHA */
    doc.setFontSize(15);

    /* MISMO METODO QUE ANTES */
    doc.text(`Cliente: ${nombreGuardado}`, 50, y);

    /* HACEMOS ESPACIO */
    y += 15;

    /* MISMO METODO QUE ANTES */
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 50, y);

    /* HACEMOS ESPACIO */
    y += 15;

    doc.text(`Empresa: TechStore`, 50, y);

    /* HACEMOS ESPACIO */
    y += 25;
    
    /* SETEAMOS UN TAMAÑO PARA PRODUCTOS */
    doc.setFontSize(16);

    /* CREAMOS LA VARIABLE TOTAL */
    let total = 0;
    
    /* SACAMOS EL TOTAL ITERANDO EN CARRITO */
    carrito.forEach(item => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        /* Y DE PASO EN CADA ITERACION PRINTEAMOS EL PRODUCTO */
        doc.text(`${item.cantidad}x ${item.nombre} - $${subtotal}`, 50, y);
        y += 20;  
    });
    
    /* HACEMOS ESPACIO */
    y += 10;  
    
    /* SETEAMOS UN TAMAÑO PARA TOTAL */
    doc.setFontSize(25);
    doc.text(`Total: $${total}`, 50, y);
    
    /*GUARDAMOS EN UNA VARIABLE LA FECHA ACTUAL*/
    let fecha = new Date();

    /* ACA GUARDAMOS EN OTR VARIABLE COMO QUEREMOS QUE SE LLAME EL PDF
    PARA ESO USAMOS COMILLAS PARA HACER TODO UN STRING
    USAMOS NOMBRE GUARDADO
    Y FECHA QUE GUARDAMOS ANTES USAMOS TOISOSSTRING CONVIERTE LA FECHA EN FORMATO ISO "2026-07-06T15:30:21.973Z"
    Y CON EL SLICE NOS QUEDAMOS LOS PRIMERO 0 caracteres → "2026-07-06" 
    AL FINAL AGREGAMOS LA EXTENSIO .PDF*/
    let nombreTicket = `ticket-${nombreGuardado}-${fecha.toISOString().slice(0,10)}.pdf`;
    
    /* GUARDAMOS EL PDF CON ESE NOMBRE */
    doc.save(nombreTicket);
    
    alert("✅ Ticket descargado correctamente");
}

// ============================================
// 5. INICIALIZAR
// ============================================

cargarTicket();