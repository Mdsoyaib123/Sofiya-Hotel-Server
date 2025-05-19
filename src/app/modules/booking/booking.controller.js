import sendResponse from "../../Utils/sendResponse.js";
import { bookingService } from "./booking.service.js";

const createBooking = async (req, res) => {
  try {
    const result = await bookingService.createBookingService(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "booking create  successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to create booking", error });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const result = await bookingService.getAllBookingsService();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch bookings", error });
  }
};

const updateBookingDate = async (req, res) => {
  const id = req.params.id;
  const {date} = req.body;

  try {
    const result = await bookingService.updateBookingDateService(
      id,
      date
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "booking updated  successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to update booking date", error });
  }
};

const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await bookingService.deleteBookingService(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "booking deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete booking", error });
  }
};

const getMyBookings = async (req, res) => {
  // if (req.query.email !== req.user.email) {
  //   return res.status(403).send({ message: "Unauthorized access" });
  // }
  try {
    const result = await bookingService.getMyBookingsService(req.query.email);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "my booking data get  successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch bookings", error });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBookingDate,
  deleteBooking,
  getMyBookings,
};
