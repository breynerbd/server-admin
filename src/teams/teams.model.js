'use strict';

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: [true, 'El nombre del equipo es obligatorio'],
        trim: true,
        maxLength: [50, 'El nombre del equipo no puede exceder 50 caracteres']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [200, 'La descripción no puede exceder 200 caracteres']
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El equipo debe tener un capitán (usuario)']
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    level: {
        type: String,
        enum: {
            values: ['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'],
            message: 'Nivel de equipo no válido',
        },
        default: 'INTERMEDIO'
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

// exportamos el modelo con el nombre Team
export default mongoose.model('Team', teamSchema);