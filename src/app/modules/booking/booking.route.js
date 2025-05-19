import express from "express";
import { bookingController } from "./booking.controller.js";

const router = express.Router();

router.post("/create-booking", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.put("/:id", bookingController.updateBookingDate);
router.delete("/:id", bookingController.deleteBooking);
router.get("/my", bookingController.getMyBookings);

export const bookingRoutes = router;
