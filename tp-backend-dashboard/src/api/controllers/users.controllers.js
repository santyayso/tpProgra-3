import userModels from "../models/users.models.js";
import bcrypt from "bcrypt";

 const controladorCrearUsuarioAdmin = async (request, response) => {

    try {
        console.table(request.body);
        const { nombre, email, contraseña } = request.body;

        // Bcrypt 1 -> Hasheamos el password del nuevo usuario admin
        const saltRounds = 10; // Indicamos cuantas veces bcrypt aplicara el algoritmo internamente (mas rondas -> mas seguro y mas lento)

        const hashedPassword = await bcrypt.hash(contraseña, saltRounds); // Esperamos a que hashee el password

        const [rows] = await userModels.insertUsuarioAdmin(nombre, email, hashedPassword);
    
        response.status(201).json({
            message: `Usuario creado con exito con id ${rows.insertId}`,
            productId: rows.insertId // Optimizacion 4: Devolvemos info util como el nuevo id creado
        });

    } catch (error) {
        console.log(error);

        response.status(500).json({
            message: "Error interno del servidor al crear usuarios"
        })
    }
}

export {
    controladorCrearUsuarioAdmin
}