// Logica para trabajar con archivos y rutas de proyecto

// Importacion de modulos para trabajar con rutas
import { fileURLToPath } from "url";
import { dirname, join} from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = join(dirname(__filename), "../../../"); // Esta es la RUTA RAIZ de nuestro servidor, que luego en el index usaremos para apuntar a /src/public

export {
    __dirname,
    join
}

