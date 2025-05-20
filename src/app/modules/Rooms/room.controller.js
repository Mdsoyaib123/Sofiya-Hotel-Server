import sendResponse from "../../Utils/sendResponse.js";
import { RoomService } from "./room.service.js";

export const createRoom = async (req, res) => {
  const result = await RoomService.createRoomInDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
};

export const getAllRooms = async (req, res) => {
  const result = await RoomService.getAllRoomsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'rooms retrieved successfully',
    data: result,
  });
};

export const getRoomById = async (req, res) => {
  const id = req.params.id;
  console.log('controller',id)
  const result = await RoomService.getRoomByIdFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'single room retrieved successfully',
    data: result,
  });
};

export const updateRoomReview = async (req, res) => {
  const roomName = req.query.name;
  const result = await RoomService.updateRoomReviewInDB(roomName, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'room review updated  successfully',
    data: result,
  });
};

export const updateRoomSeats = async (req, res) => {
  const id = req.params.id;
  const seatData = req.body.SeatData;
  const result = await RoomService.updateRoomSeatsInDB(id, seatData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'room seat updated successfully',
    data: result,
  });
};

export const roomController ={
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomReview,
  updateRoomSeats
}