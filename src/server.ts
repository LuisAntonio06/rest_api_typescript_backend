import express from "express";
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec , { swaggerUiOptions } from './config/swagger';
import router from "./router";
import db from "./config/db";

/* Conectar a base de datos */


async function conectDB(){
    try {
        /* Conectar a la base de datos */
        await db.authenticate();
        db.sync();
        /* console.log(colors.bgGreen.white.bold('Conexión exitosa a la base de datos')); */

    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white.bold('Hubo un error al conectar en la base de datos'));
    }
}
conectDB();

/* Crear instancia de express */
const server = express();   

/* Permitir conexiones */
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if (origin === process.env.FRONTEND_URL) {
            callback(null,true);
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions));

/* Leer datos de formularios */
server.use(morgan('dev'))
server.use(express.json())


/* Importar las rutas sel servicio */
server.use('/api/products' , router);

/* Docs */
server.use('/docs' , swaggerUi.serve , swaggerUi.setup(swaggerSpec , swaggerUiOptions));

export default server;