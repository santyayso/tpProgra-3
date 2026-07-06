
import UserModels from "../models/users.models.js"
import bcrypt from "bcrypt";

const vistaLogin = (request, response) => {
    response.render("login", { 
        title: "Login",
        about: "Introduzca sus credenciales",
    })
}



//////////////////////
// Funcionalidad login
const loginUser = async (request, response) => {

    try {
        const { email, password } = request.body; 

        // Evitamos consulta innecesaria
        if (!email || !password) {
            return response.render("login", {
                title: "Login",
                about: "Introduzca sus credenciales",
                error: "Todos los campos son obligatorios"
            })
        }

      
        const [filas] = await UserModels.selectUsuariosAdmins(email);

        // En caso de que no existan los usuarios
        if (filas.length === 0) {
            return response.render("login", {
                title: "Login",
                about: "Introduzca sus credenciales",
                error: "Credenciales incorrectas"
            })
        }

      
        const usuario = filas[0];
        const match = await bcrypt.compare(password, usuario.contraseña);
      

 
        if (match) {
            // Guardar la sesion
            request.session.user = {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
    
            // Redirigir a dashboard
            response.redirect("/dashboard/index"); // En lugar de renderizar con res.render("") -> aca redirigimos a una URL

            
        } else {
            // En caso de que no coincidan los hashes
            return response.render("login", {
                title: "Login",
                about: "Introduzca sus credenciales",
                error: "Contraseña invalida"
            })

        }

    } catch (error) {
        console.log(error);
    }
}


//////////////////////
// Destruir la sesion
const loginDestroy = (request, response) => {

    // Destruimos la sesion
    request.session.destroy((err) => {

        // En caso de error
        if (error) {
            console.log("Error al destruir la sesion: ", err);

            return response.status(500).json({
                message: "Error al destruir la sesion"
            })
        };

        // Destruida la sesion, redirigimos al login 
        response.redirect("/login");
    })
}

export {
    loginUser,
    loginDestroy,
    vistaLogin
}