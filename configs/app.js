'use strict';

//Importaciones
import express from  'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';

const BASE_URL = '/kinalSportAdmin/v1';

//Configuracion de mi aplicacion
//Se almacena en una funcion para que pueda ser exportada o usada en un archivo
//usada al crear la instancia de la aplicacion
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb'}))
    //Resivira json de menos de 10 megabytes
    app.use(express.json({limit: '10mb'}))
    //
    app.use(cors(corsOptions))
    //Morgan nos explicara errores que surgiran en nuestro programa
    app.use(morgan('dev'))
}

//Funcion para iniciar el servidor
const initServer = async (app) => {
    //Creacion de la instancia de la aplicacion
    app = express();
    const PORT = process.env.PORT || 3001;

    try {

        //Configuracion de los middlewares (Mi aplicacion)
        middlewares(app);
         app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
         });

         //primera ruta
         app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json(
                {
                    status: 'ok',
                    service: 'kinalSport Admin',
                    version: '1.0.0'
                }
            );
         });

    } catch (error) {
        console.log(error)
    }
}

export { initServer };