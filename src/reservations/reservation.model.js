'use strict';

import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    /*user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio']
    },*/
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
        required: [true, 'La cancha es obligatoria']
    },
    date: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    startTime: {
        type: String,
        required: [true, 'La hora de inicio es obligatoria']
    },
    endTime: {
        type: String,
        required: [true, 'La hora de fin es obligatoria']
    },
    totalPrice: {
        type: Number,
        required: [true, 'El precio total es obligatorio']
    },
    status: {
        type: String,
        enum: {
            values: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'],
            message: 'Estado no válido',
        },
        default: 'PENDIENTE'
    },
    isActive: {
        type: Boolean,
        default: true,
    },
})

export default mongoose.model('Reservation', reservationSchema);