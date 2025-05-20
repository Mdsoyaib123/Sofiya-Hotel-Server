// models/room.model.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  userName: { type: String, required: true },
  date:{type:String,required:true}
});

const roomSchema = new mongoose.Schema(
  {
    room_name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    available_seat: { type: Number, required: true },
    review: {
    type: [reviewSchema],
    default:[]
  },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.model("Room", roomSchema);
