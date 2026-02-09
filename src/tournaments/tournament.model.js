'use strict';

import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    tournamentName: {
        type: String,
        required: [true, 'El nombre del torneo es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre del torneo no puede exceder 100 caracteres']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    startDate: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    endDate: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria']
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    maxTeams: {
        type: Number,
        required: [true, 'El límite de equipos es obligatorio'],
        min: [2, 'Un torneo debe tener al menos 2 equipos']
    },
    status: {
        type: String,
        enum: {
            values: ['INSCRIPCIONES', 'EN_CURSO', 'FINALIZADO'],
            message: 'Estado del torneo no válido',
        },
        default: 'INSCRIPCIONES'
    },
    prize: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

export default mongoose.model('Tournament', tournamentSchema);