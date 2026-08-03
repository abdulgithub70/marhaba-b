const asyncHandler = require("../utils/asyncHandler");
const Reservation = require("../models/Reservation");

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Public
const createReservation = asyncHandler(async (req, res) => {
  const { name, phone, email, guests, date, time, request } = req.body;

  const reservation = await Reservation.create({
    name,
    phone,
    email,
    guests,
    date,
    time,
    request,
  });

  res.status(201).json({
    message: "Reservation received successfully",
    reservation,
  });
});

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private (add auth middleware in production)
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find().sort({ createdAt: -1 });
  res.json(reservations);
});

// @desc    Update reservation status
// @route   PATCH /api/reservations/:id
// @access  Private
const updateReservationStatus = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  reservation.status = req.body.status || reservation.status;
  await reservation.save();
  res.json(reservation);
});

module.exports = { createReservation, getReservations, updateReservationStatus };
