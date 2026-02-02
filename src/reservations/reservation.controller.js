import Reservation from "./reservation.model.js";

export const getReservations = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;
    const filter = { isActive };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { date: -1, startTime: 1 }, 
    };

    const reservations = await Reservation.find(filter)
      .populate("field", "name location") 
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort);

    const total = await Reservation.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: reservations,
      pagination: {
        currentPage: options.page,
        totalPages: Math.ceil(total / options.limit),
        totalRecords: total,
        limit: options.limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las reservas",
      error: error.message,
    });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id)
      .populate("field", "name location");

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener la reserva",
      error: error.message,
    });
  }
};

export const createReservation = async (req, res) => {
  try {
    const reservationData = req.body;
    const reservation = new Reservation(reservationData);
    await reservation.save();

    res.status(201).json({
      success: true,
      message: "Reserva creada exitosamente",
      data: reservation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al crear la reserva",
      error: error.message,
    });
  }
};

export const confirmReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status: "CONFIRMADA" },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reserva confirmada exitosamente",
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al confirmar la reserva",
      error: error.message,
    });
  }
};
