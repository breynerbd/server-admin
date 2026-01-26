//importaciones
import dotenv from 'dotenv';
import { initServer } from './configs/app.js';

//configuracion de variables de entorno
dotenv.config();

//errores no capturados
process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    process.exit(1);
});

//Inicializacion del servidor
console.log('Iniciando servidor de KinalSport...');
initServer();