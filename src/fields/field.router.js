//importar las dependencias

import { Router } from "express";
import { getFields } from "./field.controller.js";

const router = Router();

//rutas GET
router.get('/', getFields);

//rutas POST

//rutas PUT


//rutas DELETE

export default router;