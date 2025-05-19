import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
 
  getBookingByEmail,
 
  getMyBookings,
  updateBookingDate,
} from "../controllers/bookings.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:email", getBookingByEmail);
router.put("/:id", updateBookingDate);
router.delete("/:id", deleteBooking);
router.get("/my", verifyToken, getMyBookings);

// export default router;
