'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTournament = [
    body('tournamentName')
        .trim()
        .notEmpty()
        .withMessage('El nombre del torneo es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres'),

    body('startDate')
        .notEmpty()
        .withMessage('La fecha de inicio es obligatoria')
        .isISO8601()
        .withMessage('La fecha de inicio debe ser válida'),

    body('endDate')
        .notEmpty()
        .withMessage('La fecha de fin es obligatoria')
        .isISO8601()
        .withMessage('La fecha de fin debe ser válida'),

    body('teams')
        .optional()
        .isArray()
        .withMessage('Los equipos deben ser un arreglo'),

    body('teams.*')
        .optional()
        .isMongoId()
        .withMessage('Cada equipo debe ser un ObjectId válido'),

    body('maxTeams')
        .notEmpty()
        .withMessage('El límite de equipos es obligatorio')
        .isInt({ min: 2 })
        .withMessage('Un torneo debe tener al menos 2 equipos'),

    body('status')
        .optional()
        .isIn(['INSCRIPCIONES', 'EN_CURSO', 'FINALIZADO'])
        .withMessage('Estado del torneo no válido'),

    body('prize')
        .optional()
        .trim(),

    checkValidators,
];

export const validateUpdateTournamentRequest = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),

    body('tournamentName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres'),

    body('startDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de inicio debe ser válida'),

    body('endDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de fin debe ser válida'),

    body('teams')
        .optional()
        .isArray()
        .withMessage('Los equipos deben ser un arreglo'),

    body('teams.*')
        .optional()
        .isMongoId()
        .withMessage('Cada equipo debe ser un ObjectId válido'),

    body('maxTeams')
        .optional()
        .isInt({ min: 2 })
        .withMessage('Un torneo debe tener al menos 2 equipos'),

    body('status')
        .optional()
        .isIn(['INSCRIPCIONES', 'EN_CURSO', 'FINALIZADO'])
        .withMessage('Estado del torneo no válido'),

    body('prize')
        .optional()
        .trim(),

    checkValidators,
];

export const validateTournamentStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];

export const validateGetTournamentById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
