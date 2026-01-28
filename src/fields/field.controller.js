//importamos las dependencias
import Field from "./field.model.js";

// Controles
export const getFields = async (req, res) => {
    try {
        //datos que vienen de la query
        const { page = 1, limit = 10, isActive } = req.query;

        //variable que utilizaremos para filtrar
        //como se realiza el filtro depende de si viene el isActive
        const filter = { isActive };

        //opciones de paginacion
        const options = {
            //convertimos en numero
            page: parseInt(page),
            limit: parseInt(limit),
            //ordenar por fecha de creación
            sort: { createdAt: -1}
        }

        //realizar la consulta al Schema Field
        const fields = await Field.find(filter)
            .limit(options.limit)
            .skip((page -1 ) * limit)
            .sort(options.sort);

        //conteo de documentos de la consulta
        const total = await Field.countDocuments(filter);

        //respuesta
        res.status(200).json({
            success: true,
            data: fields,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: limit
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los campos',
            error: error.message
        })
    }
}

