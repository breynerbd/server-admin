import { Router } from "express";
import {
  getReservations,
  getReservationById,
  confirmReservation,
  createReservation, 
} from "./reservation.controller.js";
import {
  validateCreateReservation,
  validateGetReservationById,
  validateConfirmReservation,
} from "../../middlewares/reservation-validators.js";

const router = Router();

router.post("/", validateCreateReservation, createReservation);

router.get("/", getReservations);

router.get("/:id", validateGetReservationById, getReservationById);

router.put("/:id/confirm", validateConfirmReservation, confirmReservation);

export default router;
