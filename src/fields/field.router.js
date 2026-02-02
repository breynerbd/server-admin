//importar las dependencias

import { Router } from "express";
import { getFields, createFields } from "./field.controller.js";
import { validateCreateField } from "../../middlewares/field-validators.js";
import { uploadFieldImage } from "../../middlewares/file-uploader.js";

const router = Router();

//rutas GET
router.get('/', getFields);

//rutas POST
router.post('/', uploadFieldImage.single('image'), validateCreateField, createFields);

//rutas PUT


//rutas DELETE

export default router;