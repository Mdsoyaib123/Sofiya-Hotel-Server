import { ObjectId } from "mongodb";
import { roomsCollection } from "../config/db.js";

export const createRoom = async (req, res) => {
  const result = await roomsCollection.insertOne(req.body);
  res.send(result);
};

export const getAllRooms = async (req, res) => {
  const result = await roomsCollection.find().toArray();
  res.send(result);
};

export const getRoomById = async (req, res) => {
  const id = req.params.id;
  const result = await roomsCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
};

export const updateRoomReview = async (req, res) => {
  const query = { room_name: req.query.name };
  const updateDoc = { $set: { review: req.body } };
  const result = await roomsCollection.updateOne(query, updateDoc);
  res.send(result);
};

export const updateRoomSeats = async (req, res) => {
  const id = req.params.id;
  console.log('form seat update ',id)
  const updateDoc = {
    $set: {
      available_seat: req.body.SeatData,
    },
  };
  console.log('updated doc', updateDoc)
  const result = await roomsCollection.updateOne(
    { _id: new ObjectId(id) },
    updateDoc
  );
  console.log('update result ', result)
  res.send(result);
};
