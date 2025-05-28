import { ObjectId } from "mongodb";
import { Room } from "./room.model.js";

const createRoomInDB = async (roomData) => {
  const isExist = await Room.findOne({ room_name: roomData.room_name });

  if (isExist) {
    return 'room is already exits'
  }
  return await Room.create(roomData);
};

const getAllRoomsFromDB = async () => {
  return await Room.find()
};

const getRoomByIdFromDB = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid Room ID');
  }

  const res = await Room.findOne({ _id: new ObjectId(id) });
  return res;
};

const updateRoomReviewInDB = async (roomName, reviewDataArray) => {
  const query = { room_name: roomName };
  const updateDoc = {
    $push: {
      review: {
        $each: reviewDataArray,
      },
    },
  };
console.log(updateDoc)
  return await Room.updateOne(query, updateDoc);
};


const updateRoomSeatsInDB = async (id, seatData) => {
  const updateDoc = { $set: { available_seat: seatData } };
  return await Room.updateOne({ _id: new ObjectId(id) }, updateDoc);
};

export const RoomService = {
  createRoomInDB,
  getAllRoomsFromDB,
  getRoomByIdFromDB,
  updateRoomReviewInDB,
  updateRoomSeatsInDB,
};
