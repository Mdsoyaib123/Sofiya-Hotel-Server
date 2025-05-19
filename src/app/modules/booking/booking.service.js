import { ObjectId } from "mongodb";
import { Booking } from "./booking.model.js";
import { User } from './../User/user.model.js';

const createBookingService = async (bookingData) => {
  return await Booking.insertOne(bookingData);
};

const getAllBookingsService = async () => {
  return await Booking.find().populate("userId").populate("roomId");
};

const updateBookingDateService = async (id, date) => {
  const updateDoc = {
    $set: { date: date },
  };
  return await Booking.updateOne({ _id: new ObjectId(id) }, updateDoc);
};

const deleteBookingService = async (id) => {
  return await Booking.deleteOne({ _id: new ObjectId(id) });
};

const getMyBookingsService = async (email) => {
  console.log(email);
  const user = await User.findOne({ email });
  console.log("user is exit", user);
  if (!user) {
    throw new Error("User not found");
  }

  return await Booking.find({ userId: user._id })
    .populate("roomId")
    .populate("userId");
};

export const bookingService = {
  createBookingService,
  getAllBookingsService,

  updateBookingDateService,
  deleteBookingService,
  getMyBookingsService,
};
