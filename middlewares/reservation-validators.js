import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateReservation = [
  body("user")
    .notEmpty()
    .withMessage("El usuario es obligatorio")
    .isMongoId()
    .withMessage("El ID del usuario debe ser un ObjectId válido"),
  body("field")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .isMongoId()
    .withMessage("El ID del campo debe ser un ObjectId válido"),
  body("date")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido (YYYY-MM-DD)"),
  body("startTime")
    .notEmpty()
    .withMessage("La hora de inicio es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora de inicio debe tener formato HH:mm"),
  body("endTime")
    .notEmpty()
    .withMessage("La hora de fin es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora de fin debe tener formato HH:mm"),
  body("totalPrice")
    .notEmpty()
    .withMessage("El precio total es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El precio total debe ser mayor o igual a 0"),
  checkValidators,
];

export const validateGetReservationById = [
  param("id")
    .isMongoId()
    .withMessage("ID de reserva debe ser un ObjectId válido"),
  checkValidators,
];

export const validateConfirmReservation = [
  param("id")
    .isMongoId()
    .withMessage("ID de reserva debe ser un ObjectId válido"),
  checkValidators,
];
