import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTeam = [
  body('teamName')
    .trim()
    .notEmpty()
    .withMessage('El nombre del equipo es requerido')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('La descripción no puede exceder 200 caracteres'),
  body('captain')
    .notEmpty()
    .withMessage('El capitán es obligatorio')
    .isMongoId()
    .withMessage('El ID del capitán debe ser un ObjectId válido'),
  body('members')
    .optional()
    .isArray()
    .withMessage('Los miembros deben ser un arreglo'),
  body('members.*')
    .optional()
    .isMongoId()
    .withMessage('Cada miembro debe ser un ObjectId válido'),
  body('level')
    .optional()
    .isIn(['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'])
    .withMessage('Nivel de equipo no válido'),
  checkValidators,
];

export const validateUpdateTeamRequest = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  body('teamName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('La descripción no puede exceder 200 caracteres'),
  body('captain')
    .optional()
    .isMongoId()
    .withMessage('El ID del capitán debe ser un ObjectId válido'),
  body('members')
    .optional()
    .isArray()
    .withMessage('Los miembros deben ser un arreglo'),
  body('members.*')
    .optional()
    .isMongoId()
    .withMessage('Cada miembro debe ser un ObjectId válido'),
  body('level')
    .optional()
    .isIn(['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'])
    .withMessage('Nivel de equipo no válido'),
  checkValidators,
];

export const validateTeamStatusChange = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  checkValidators,
];

export const validateGetTeamById = [
  param('id')
    .isMongoId()
    .withMessage('ID debe ser un ObjectId válido de MongoDB'),
  checkValidators,
];
