import express from "express";
import { roomController } from "./room.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { roomValidation } from "./room.validation.js";

const router = express.Router();

router.post(
  "/create-room",
  validateRequest(roomValidation.roomValidationSchema),
  roomController.createRoom
);
router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoomById);
router.put("/update-review", roomController.updateRoomReview);
router.patch("/update-seats/:id", roomController.updateRoomSeats);

export const roomRoute = router;
