
/* INICIAMOS UNA VARIABLE DEL NOMBRE VACIA */
let nombreUsuario = ''; 

/* GUARDAMOS EN UNA VARIABLE LA REFERENCIA AL INPUT EN EL HTML*/
const inputNombre = document.getElementById('input-nombre'); 

/* CREAMOS LA FUNCION */
function iniciarSesion() { 

    /* CREAMOS OTRA VARIABLE A LA QUE LLAMAMOS NOMBRE, Y GUARDAMOS EL INPUNT DEL CLIENTE LIMPIO */
    const nombre = inputNombre.value.trim();

    /* IF PREGUNTANDO SI EL CLIENTE NO PUSO NINGUN NOMBRE Y LE DIO A CONTINUAR  */
    if (nombre === '') {
        alert(" Por favor, ingresa tu nombre");
        return;
    }

    /* CAMBIAMOS LA VARIABLE VACIA QUE CREAMOS ANTES POR LA QUE PUSO EL USUARIO*/
    nombreUsuario = nombre; 

    /* LO GUARDAMOS EN EL LOCAL STORAGE*/
    sessionStorage.setItem('nombreUsuario', nombreUsuario); 

    /* REDIRECCIONAMOS A INDEX.HTML */
    window.location.href = "../../index.html"; 
}

