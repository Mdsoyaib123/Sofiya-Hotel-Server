import { ObjectId } from "mongodb";
import { bookingCollection } from "../config/db.js";


export const createBooking = async (req, res) => {
  const result = await bookingCollection.insertOne(req.body);
  res.send(result);
};
export const getAllBookings = async (req, res) => {
  const result = await bookingCollection.find().toArray();
  res.send(result);
};

export const getBookingByEmail = async (req, res) => {
  const email = req.params.email;
  console.log(email)
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  const result = await bookingCollection.find({ email }).toArray();
  console.log(result)
  res.send(result);
};



export const updateBookingDate = async (req, res) => {
  const id = req.query.id;
  const updateDoc = {
    $set: { date: req.body.updateDate },
  };
  const result = await bookingCollection.updateOne(
    { _id: new ObjectId(id) },
    updateDoc
  );
  res.send(result);
};


export const deleteBooking = async (req, res) => {
  const id = req.params.id;
  const result = await bookingCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

export const getMyBookings = async (req, res) => {
  if (req.query.email !== req.user.email) {
    return res.status(403).send({ message: "Unauthorized access" });
  }

  const result = await bookingCollection
    .find({ email: req.query.email })
    .toArray();
  res.send(result);
};
